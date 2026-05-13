import { useEffect } from "react";

interface PageSchemaProps {
  id: string;
  schema: object;
}

/**
 * Injects a JSON-LD structured data <script> into <head> for the
 * lifetime of the mounted route. Cleans up on unmount so secondary
 * pages don't pollute each other's schema.
 */
export function PageSchema({ id, schema }: PageSchemaProps) {
  useEffect(() => {
    const existing = document.getElementById(id);
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const node = document.getElementById(id);
      if (node) node.remove();
    };
  }, [id, schema]);

  return null;
}