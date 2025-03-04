// https://2ality.com/2020/04/classes-as-values-typescript.html
/* eslint-disable @typescript-eslint/no-explicit-any */
type Class<T> = new (...args: any[]) => T;
/* eslint-enable @typescript-eslint/no-explicit-any */

export const ensureNotNull = <T>(value: T | null): T => {
  if (value == null) {
    throw new Error('value is null');
  }
  return value;
};

const ensureArrayType = <T>(value: object[], clazz: Class<T>): T[] => {
  for (const element of value) {
    if (!(element instanceof clazz)) {
      throw new Error(`element is not a ${clazz.name}`);
    }
  }
  return value as T[];
};

export const ensureHtmlElement = <T extends HTMLElement>(element: object | null,
  clazz: Class<T>): T => {
  if (element == null) {
    throw new Error("Couldn't find element");
  }
  if (!(element instanceof clazz)) {
    throw new Error(`Is not a ${clazz.name} as expected: ${element}`);
  }

  return element;
};

export const htmlElementById = <T extends HTMLElement>(id: string, clazz: Class<T>): T => {
  const element = document.getElementById(id);
  if (element == null) {
    throw new Error(`Couldn't find element with id ${id}`);
  }
  if (!(element instanceof clazz)) {
    throw new Error(`element with id ${id} not an ${clazz.name} as expected!`);
  }
  return element;
};

export const htmlElementBySelector = <T extends HTMLElement>(selector: string,
  clazz: Class<T>): T => {
  const element = document.querySelector(selector);
  if (element == null) {
    throw new Error(`Couldn't find element with selector ${selector}`);
  }
  if (!(element instanceof clazz)) {
    throw new Error(`element with selector ${selector} not an ${clazz.name} as expected!`);
  }
  return element;
};

export const htmlElementsBySelector = <T extends HTMLElement>(selector: string,
  clazz: Class<T>): T[] => {
  const elements = Array.from(document.querySelectorAll(selector));
  return ensureArrayType(elements, clazz);
};

export const htmlElementByClass = <T extends HTMLElement>(className: string,
  clazz: Class<T>): T => {
  const elements = document.getElementsByClassName(className);
  if (elements.length === 0) {
    throw new Error(`Couldn't find element with class ${className}`);
  }
  if (elements.length > 1) {
    throw new Error(`More than one element found with class ${className}`);
  }
  const element = elements[0];
  if (!(element instanceof clazz)) {
    throw new Error(`element with class ${className} not an ${clazz.name} as expected!`);
  }
  return element;
};

// https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
export function waitForElement<T extends HTMLElement>(
  selector: string,
  clazz: Class<T> = HTMLElement as Class<T>
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const e = document.querySelector(selector);
    if (e) {
      if (!(e instanceof clazz)) {
        reject(new Error(`element with selector ${selector} not an ${clazz.name} as expected!`));
      } else {
        resolve(e);
      }
    }

    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector);
      if (element) {
        if (!(element instanceof clazz)) {
          reject(new Error(`element with selector ${selector} not an ${clazz.name} as expected!`));
        } else {
          resolve(element);
          observer.disconnect();
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

export const parent = (element: Element): Element => {
  const p = element.parentElement;
  if (p === null) {
    throw new Error('parent of element is unexpectedly null');
  }
  return p;
};
