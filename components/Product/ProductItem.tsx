interface ProductItemProps {
  hit: any;
  components: any;
}

export function ProductItem({ hit, components }: ProductItemProps) {
  return (
    <a href={hit.url} className="aa-ItemLink">
      <div className="aa-ItemContent">
        <div className="aa-ItemTitle">
          <components.Highlight hit={hit} attribute="name" />
        </div>
      </div>
    </a>
  );
}
