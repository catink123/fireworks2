export function applyStyles(element: HTMLElement, styles: Partial<CSSStyleDeclaration>) {
  for (const [i, v] of Object.entries(styles)) {
    element.style[i] = v;
  }
}