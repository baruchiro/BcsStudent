---
title: How to structure your Bot Framework project in ASP.NET Core
published: true
date: 2019-05-06 18:00:47
summary: |
  Decisions I made while building a bot with Microsoft Bot Framework.
  Read with LTR in <a href="https://dev.to/baruchiro/bot-framework-net-design-decisions-5gl1">Dev.to</a>
tags: ["bot-framework", ".NET Core", "ASP.NET"]
language: en
---

## Prerequisites

- Knowledge of _ASP.NET Core_ project structure.
- Basic knowledge of configuring and developing a _Bot Framework_ in _C#_.

## Intro

In my final project at the college, I write a bot with Microsoft Bot Framework on ASP.NET Core.

I think Microsoft has a lot of good things and lots of pretty things that are open source. The Bot Framework is a very good idea, but something is not baked there.

In order to write a well-designed code, and avoid from duplicated code, I had to make some decisions that seemed not to have been included in the original documentation.

## Plug & Play

In C#, the most used way to implement a bot with Bot Framework is to add it as middleware in ASP.NET Core app, and that's my case.

Looking forward, if we want to use that bot in a different place, We will receive his logic, but also his WebAPI infrastructure. So if now we think about the option of publishing our bot as nuget, for integrate it with **more then one project**, we may think about writing the bot only, in a project of its own.

### The project

The first step- writing the bot in its own project, is very straight. A bot is just a class that implements the [`IBot`](https://github.com/Microsoft/botbuilder-dotnet/blob/master/libraries/Microsoft.Bot.Builder/IBot.cs) interface, with one method:

```csharp
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using System.Threading;
using System.Threading.Tasks;

namespace Microsoft.Bot.Builder
{
    public interface IBot
    {
        Task OnTurnAsync(ITurnContext turnContext, CancellationToken cancellationToken = default(CancellationToken));
    }
}

```

Of course, all the states and accessors ([`ConversationState`](https://docs.microsoft.com/en-us/dotnet/api/microsoft.bot.builder.conversationstate), [`IStatePropertyAccessor<T>`](https://docs.microsoft.com/en-us/dotnet/api/microsoft.bot.builder.istatepropertyaccessor-1>)) will be in the Bot project.

**The rule of thumb** is that things that the bot needs **only for its logic**, and are independent of the environment in which it runs, should be in its project. (Except when you want your bot to be more configurable, but that is not the subject of this post). But things that **depend on the environment** in which the bot runs, such as things that belong to the Console Application against things that are relevant to the Web API, or a file system, a database, etc., will be injected into the bot from the outside.

**How?**

### The extension method(s)

We will create an Extension Method for the to extend the functionality of ASP.NET, but leave the implementation in our project.

The bot definition is made by code like the following code:

```csharp
services.AddBot<RecommendationBot>(options =>
{
    var secretKey = configuration.GetSection("botFileSecret")?.Value;
    var botFilePath = configuration.GetSection("botFilePath")?.Value;

    // Loads .bot configuration file and adds a singleton that your Bot can access through dependency injection.
    var botConfig = BotConfiguration.Load(botFilePath ?? @"Echo.bot", secretKey);
    services.AddSingleton(sp =>
                    botConfig ??
                    throw new InvalidOperationException(
                        $"The .bot configuration file could not be loaded. ({botFilePath ?? @"Echo.bot"})"));

    // Retrieve current endpoint.
    var environment = env.IsProduction() ? "production" : "development";
    var service = botConfig.Services.FirstOrDefault(s => s.Type == "endpoint" && s.Name == environment);
    if (!(service is EndpointService endpointService))
    {
    throw new InvalidOperationException("The .bot file does not contain an endpoint.");
    }

    options.CredentialProvider =
    new SimpleCredentialProvider(endpointService.AppId, endpointService.AppPassword);

    // Creates a logger for the application to use.
    ILogger logger = new LoggerFactory().CreateLogger<RecommendationBot>();

    // Catches any errors that occur during a conversation turn and logs them.
    options.OnTurnError = async (context, exception) =>
    {
    logger.LogError($"Exception caught : {exception}");
    await context.SendActivityAsync("Sorry, it looks like something went wrong.");
    };
});

services.AddSingleton<IStorage>(new MemoryStorage());
services.AddSingleton<StateManager>();
```

(At the time of writing, version 4.3 was released. In this version, the configuration is simpler and based on Dependency Injection.)

In a regular project, the `services` variable is the variable obtained as a parameter in the function `public void ConfigureServices(IServiceCollection services)` in the `Startup` class. But since we don't want all of this code to be in the `Startup` class, which is a class of the project that **uses** the bot, we can easily create an Extension Method for the `IServiceCollection` object, **within the bot project**:

```csharp
public static class BotRegistrationExtension
{
    public static void AddOurBot(this IServiceCollection services, IConfiguration configuration, IHostingEnvironment env)
    {
        services.AddBot<RecommendationBot>(options =>
        {
            // Code from above
        });

        services.AddSingleton<IStorage>(new MemoryStorage());
        services.AddSingleton<StateManager>();
    }
}
```

Now, adding and removing the bot in the code will be very simple, all we need to do is call this function in one place in the `Startup.ConfigureServices`:

```csharp
services.AddOurBot(Configuration, _environment);
```

### Shared interfaces

Now, we've seen how to completely separate the bot from the project that uses it. In this way, we can provide the bot as Nuget Package, and hide all the implementation, so that the programmer only needs to call the Extension Method that we have set up to add the bot to its ASP.NET project.

But what about the components that the robot needs to communicate with the infrastructure? We said earlier that there are things that depend on the project that runs the bot, so they will not be defined in the bot project.

Assume the bot needs to save data in a database.

You can probably guess the way of implementation, since this is not a special case of the bot, but rather a correct form of programming.

We will create an **interface** in the bot project, which will define the necessary methods, such as `Save` and `Load`.

Now, we can require the user to provide us with interface implementation while calling our Extension Method. We will do this by adding a **parameter** to the function, or by defining the function as a **generic** function:

```csharp
// For provide an implementation as an argument
public static void AddOurBot(this IServiceCollection services, IConfiguration configuration, IHostingEnvironment env, IDbContext dbContext)
{
    // The code from above
    services.AddScoped(typeof(IDbContext), provider => dbContext);
}

public static void AddOurBot<T>(this IServiceCollection services, IConfiguration configuration, IHostingEnvironment env)
    where T : class, IDbContext
{
    // The code from above
    services.AddScoped(typeof(IDbContext), typeof(T));
}
```

## Summary

I've shown a simple case in the Bot Framework that should be implemented more correctly.
This example can be taken for any other project.
In the following posts I will present things about the objects in the Bot Framework, such as `Waterfall` and `Prompt`, about their problems in terms of software design, and how I dealt with them.
You are welcome to ask, comment, correct and ask for more posts.

Thanks!
