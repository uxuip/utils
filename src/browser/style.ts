const computedStyleMap = new WeakMap<Element, CSSStyleDeclaration>()

/**
 * each call of getComputedStyle will return a new object,
 * but it's a live CSS declaration, meaning it'll be updated when the element's style is changed
 */
export function getComputedStyleCached(el: Element): CSSStyleDeclaration {
  let computedStyle: undefined | CSSStyleDeclaration = computedStyleMap.get(el)
  if (!computedStyle) {
    computedStyle = getComputedStyle(el, null)
    computedStyleMap.set(el, computedStyle)
  }
  return computedStyle
}

export function isInShadowRoot(node: Node) {
  return node.getRootNode() instanceof ShadowRoot
}
