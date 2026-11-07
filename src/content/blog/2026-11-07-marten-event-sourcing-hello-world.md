---
title: 'Hello, Marten: event sourcing on PostgreSQL'
description: 'A first look at using Marten as an event store in .NET: streams, events, and rebuilding state.'
pubDate: '2026-11-07'
tags: ['Event sourcing', '.NET']
draft: true # remove when ready to publish
---

**TL;DR:** [Marten](https://martendb.io) turns PostgreSQL into an event store for .NET.
You append events to a stream and Marten rebuilds your aggregate from them.

## Context

Event sourcing means that instead of storing an object's current state, you store every
change as an event and rebuild the state by replaying those events. Marten handles this on
top of PostgreSQL, so there's no separate event store to run. This post is the smallest
setup that shows the idea; later posts will build on it.

## What I tried

### 1. Register Marten

```csharp
builder.Services.AddMarten(options =>
{
    options.Connection(builder.Configuration.GetConnectionString("Marten")!);
})
.UseLightweightSessions();
```

### 2. Define events and an aggregate

Events are plain records. The aggregate has `Apply` methods that Marten calls when it
replays the stream:

```csharp
public record AccountOpened(Guid AccountId, string Owner);
public record MoneyDeposited(decimal Amount);
public record MoneyWithdrawn(decimal Amount);

public class Account
{
    public Guid Id { get; set; }
    public string Owner { get; set; } = "";
    public decimal Balance { get; set; }

    public void Apply(AccountOpened e)
    {
        Id = e.AccountId;
        Owner = e.Owner;
    }

    public void Apply(MoneyDeposited e) => Balance += e.Amount;
    public void Apply(MoneyWithdrawn e) => Balance -= e.Amount;
}
```

### 3. Append events and read state back

```csharp
var id = Guid.NewGuid();

// Start a stream with its first events
session.Events.StartStream<Account>(id,
    new AccountOpened(id, "Maki"),
    new MoneyDeposited(100m));
await session.SaveChangesAsync();

// Append more events later
session.Events.Append(id, new MoneyWithdrawn(30m));
await session.SaveChangesAsync();

// Rebuild the current state from the events
var account = await session.Events.AggregateStreamAsync<Account>(id);
// account.Balance == 70
```

## What I learned

- Events live in the `mt_events` table and streams in `mt_streams`, so you can inspect
  them with plain SQL.
- `AggregateStreamAsync` replays the stream every time it's called. For read-heavy
  aggregates, use a projection (`options.Projections.Snapshot<Account>(SnapshotLifecycle.Inline)`)
  so Marten stores the current state as a document.
- TODO: add more notes.

## Next steps

- Projections: inline vs. async
- Optimistic concurrency with expected stream versions
- Pairing Marten with Wolverine

## References

- [Marten docs: event store](https://martendb.io/events/)
