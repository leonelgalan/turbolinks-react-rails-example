# README

## :notebook: Issue #607: turbolinks:before-render for unmounting causes warnings

> Warning: unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.

https://github.com/leonelgalan/turbolinks-react-rails-example/tree/v1,

## Proposed Fix

```
document.addEventListener("DOMContentLoaded", reactOnRailsPageLoaded)
document.addEventListener('turbolinks:render', reactOnRailsPageLoaded)
document.addEventListener('turbolinks:before-render', reactOnRailsPageUnloaded)
```

https://github.com/leonelgalan/turbolinks-react-rails-example/tree/v2

## New Warning

https://github.com/leonelgalan/turbolinks-react-rails-example/tree/v3 and https://morning-ravine-81180.herokuapp.com/pages/one

> Warning: setState(...): Can only update a mounted or mounting component. This usually means you called setState() on an unmounted component. This is a no-op. Please check the code for the One component.

With the help of the `rails server` logs I noticed one was being rendering twice, as soon as I added a `sleep 1` to make the asynchronous request slower, the warning appear, just like it does in my project.

Logs:

```

### VISIT ONE ###

Started GET "/pages/one" for ::1 at 2017-04-10 21:25:45 -0400
Processing by PagesController#one as HTML
  Rendering pages/one.html.erb within layouts/application
  Rendered pages/one.html.erb within layouts/application (0.4ms)
Completed 200 OK in 38ms (Views: 36.2ms | ActiveRecord: 0.0ms)


Started GET "/pages/three" for ::1 at 2017-04-10 21:25:45 -0400
Processing by PagesController#three as */*
Completed 200 OK in 1005ms (Views: 0.2ms | ActiveRecord: 0.0ms)

### VISIT TWO (CLICK ON TWO) ###

Started GET "/pages/two" for ::1 at 2017-04-10 21:25:49 -0400
Processing by PagesController#two as HTML
  Rendering pages/two.html.erb within layouts/application
  Rendered pages/two.html.erb within layouts/application (0.7ms)
Completed 200 OK in 43ms (Views: 41.1ms | ActiveRecord: 0.0ms)


Started GET "/pages/three" for ::1 at 2017-04-10 21:25:49 -0400
Processing by PagesController#three as */*
Completed 200 OK in 1005ms (Views: 0.3ms | ActiveRecord: 0.0ms)

### VISIT ONE (CLICK ON ONE) ###

Started GET "/pages/one" for ::1 at 2017-04-10 21:25:53 -0400
Processing by PagesController#one as HTML
Started GET "/pages/three" for ::1 at 2017-04-10 21:25:53 -0400
  Rendering pages/one.html.erb within layouts/application
  Rendered pages/one.html.erb within layouts/application (1.3ms)
Processing by PagesController#three as */*
Completed 200 OK in 75ms (Views: 72.3ms | ActiveRecord: 0.0ms)


Started GET "/pages/three" for ::1 at 2017-04-10 21:25:53 -0400
Processing by PagesController#three as */*
Completed 200 OK in 1001ms (Views: 0.2ms | ActiveRecord: 0.0ms)


Completed 200 OK in 1005ms (Views: 0.2ms | ActiveRecord: 0.0ms)
```
