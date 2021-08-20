---
hide_title: true
id: util.removewithfunction
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index) &gt; [@jsplumb/util](./util) &gt; [removeWithFunction](./util.removewithfunction)

## removeWithFunction() function

Remove the entry from the array for which the function `f` returns true.

<b>Signature:</b>

```typescript
export declare function removeWithFunction<T>(a: Array<T>, f: (_a: T) => boolean): boolean;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  a | Array&lt;T&gt; |  |
|  f | (\_a: T) =&gt; boolean |  true if an element was removed, false if not. |

<b>Returns:</b>

boolean
