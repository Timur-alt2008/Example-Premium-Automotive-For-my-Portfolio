import type { FaqItem } from '../../data/content';
import { AccordionItem } from '../ui/Accordion';

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq-list">
      {items.map((item) => (
        <AccordionItem key={item.q} title={item.q}>
          <p>{item.a}</p>
        </AccordionItem>
      ))}
    </div>
  );
}
