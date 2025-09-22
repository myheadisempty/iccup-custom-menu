export class Template {
  static render(template: string, variables: Record<string, unknown>): string {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) =>
      String(variables[key] ?? match)
    );
  }
}
