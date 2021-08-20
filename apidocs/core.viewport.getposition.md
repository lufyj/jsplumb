---
hide_title: true
id: core.viewport.getposition
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index) &gt; [@jsplumb/core](./core) &gt; [Viewport](./core.viewport) &gt; [getPosition](./core.viewport.getposition)

## Viewport.getPosition() method

Gets the position of the element. This returns both the original position, and also the translated position of the element. Certain internal methods, such as the anchor calculation code, use the unrotated position and then subsequently apply the element's rotation to any calculated positions. Other parts of the codebase - the Toolkit's magnetizer or pan/zoom widget, for instance - are interested in the rotated position.

<b>Signature:</b>

```typescript
getPosition(id: string): ViewportElement<T["E"]>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  id | string |  |

<b>Returns:</b>

[ViewportElement](./core.viewportelement)<!-- -->&lt;T\["E"\]&gt;
