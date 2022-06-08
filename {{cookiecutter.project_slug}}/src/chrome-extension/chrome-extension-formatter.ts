{% if cookiecutter.asana_api == 'yes' -%}
import * as Asana from 'asana';
{% endif %-}
import { escapeHTML } from './omnibox.js';

export default class ChromeExtensionFormatter {
{-% if cookiecutter.asana_api == 'yes' %}
  formatTask = (task: Asana.resources.Tasks.Type) => {
    const project = task.memberships[0]?.project;

    let membership = '';

    if (task.parent != null) {
      membership += ` / ${escapeHTML(task.parent.name)}`;
    }
    if (project != null) {
      membership += ` <dim>${project.name}</dim>`;
    }

    return `${escapeHTML(task.name)}${membership}`;
  };
{% endif %-}
}
