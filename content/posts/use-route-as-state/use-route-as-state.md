---
title: How to sync component state with React Router
published: true
date: 2021-07-07
cover_image: ./use-route-as-state.gif
description: |
  Custom hooks with the useState interface to use the React Router state as the component state.
tags: ["react", "npm"]
publications:
  - https://dev.to/baruchiro/bot-framework-net-design-decisions-5gl1
language: en
---

[![npm](https://img.shields.io/badge/npm-use--route--as--state-informational?logo=npm)](https://www.npmjs.com/package/use-route-as-state)

## Use Case

You have a webpage showing your data, and an input component that controls the filtering of that data.

**For example**, you have a simple **list of students**, and a **search box** that filters the list as you type.

You want, of course, to make the `value` of the input reactive, in order to change the subset of the data whenever the `value` changes.

But you also want the user to be able to **share a link** to the current status of the page at any time.

**In our example**, you want the contents of the search box to be represented in the URL as well, as _Query String_, for example.

![searchlist2](https://dev-to-uploads.s3.amazonaws.com/i/r6iag63d4moogzazcp5n.gif)

##### Let's see how to make the `value` from one component to be reactive to both **component state** and **Router**, with clean code.

## The Simple (but complicated) Way

We will start with the direct way. We need to **get the data from the `route`**, and **update the route on change**:

> We have a few APIs (hooks) to get the data from the _Router_. For this post I chose to use [_URL Params_](https://reactrouter.com/web/example/url-params) with [`useParams`](https://reactrouter.com/web/api/Hooks/useparams) for simpler code samples, although in a real app, _Query String_ make more sense for this kind of use case.

> **Note** that to use _URL Params_ you have to declare the params in the _Router_ `path` prop, something like `/:param1/:param2?`.

### Get the data from the `route`

When the component mounts, we need to read the _URL Params_, in case the user gets to our component from a link that should affect the state:

```react
const SearchBox = () => {
    const { param1 } = useParams()
    const [search, setSearch] = useState(param1)
}
```

But this is not enough, since route changes often don't reload the page (which is good). If there is no page reload, the state won’t change because the component is already mounted.

We need to define the _URL Param_ change as an effect:

```react
const SearchBox = () => {
    const { param1 } = useParams()
    const [search, setSearch] = useState()

    useEffect(() => setSearch(param1), [param1])
}
```

✔️ Getting the data from the `route` is done - the **state** is synced with the **route** (but the **route** is not synced with the **state**).

{% codesandbox react-router-url-parameters-forked-1ub6s module=/RouteParams.js initialpath=/li %}

### Update the route on change

Now we can update the `search` state with `setSearch`, but we want to keep the URL up to date with the latest `search`, in order to allow the user to copy the URL at any time.

The only way (that I know) to change the URL with _React Router_ is with the [`history` API](https://reactrouter.com/web/api/history):

```react
const SearchBox = () => {
  // Code from previous examples

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => history.replace("/" + e.target.value)}
      />
      <SearchList search={search} />
    </div>
  );
};
```

✔️ Update the route on change is done - change the `route` instead of the `state`, and the `state` will get updated from the `useEffect` hook.

{% codesandbox react-router-url-parameters-forked-dk35u module=/RouteParams.js initialpath=/li %}

## Interim conclusions

- It is working very well in our simple example (**even better than I thought!**)
- To use the `route` as our `state`, we used **four** hooks (`useParams`, `useState`, `useHistory` and `useEffect`) instead of **one** hook to get the `state` and a method to update it.
- We will need **more and more code** if we want to use _Query Params_ or if we want the `history.replace` function call to be more generic with the `path` argument.

Actually, the solution seems very simple at this point.

> **Spoiler**- I created a package that implements this solution.
> I must share that I wonder if I would have created this package if I had written the article earlier, and understood that the solution is simple and required.
> In any case, I felt a lack of idea-sharing of this solution, so I think it is worth writing the post and creating the package.

We need to hide all this logic in a _custom hook_.

## Organize the code

Let's move all the code to a dedicated function:

```react
const useCustomParams = () => {
  const { param1 } = useParams();
  const [search, setSearch] = useState();

  const history = useHistory();

  useEffect(() => setSearch(param1), [param1]);

  const replace = (newParam) => history.replace("/" + newParam);

  return [search, replace];
};
```

> You don't really need the `state` here, because you have a closed flow from `useParams` to the component, then with `history` back to the `useParams`.
> But you will need it for the _Query String_ case.

All that is left is not to be dependent on the `path` or specific _URL Param_:

```react
const useCustomParams = () => {
  const { params, path } = useRouteMatch();

  const history = useHistory();

  const updateParams = (updatedParams) => {
    Object.assign(params, updatedParams);
    history.push(generatePath(path, params));
  };
  return [params, updateParams];
};
```

I don't know the specific `path` or `params`, I just take, update and push them again.

{% codesandbox react-router-url-parameters-forked-6d236 module=/RouteParams.js initialpath=/li %}

---

After going through this process myself, and seeing that there was a lack of information on this subject, I created an npm package called [`use-route-as-state`](https://www.npmjs.com/package/use-route-as-state) that implements the solution described in the article.

You are welcome to [use](https://www.npmjs.com/package/use-route-as-state) and [contribute](https://github.com/baruchiro/use-route-as-state)!

Thanks to [@brafdlog](https://github.com/brafdlog) for linguistic editing and suggestions.
