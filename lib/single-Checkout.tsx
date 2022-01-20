export const accordionButtonStyle = (formStages: { stage1: any }) => {
  const accordion = {
    href: formStages.stage1 ? "#payment" : "nill",
    headClassName: formStages.stage1
      ? "accordion-button"
      : "accordion-button collapsed",
    bodyClassName: formStages.stage1
      ? "accordion-collapse collapse show"
      : "accordion-collapse collapse",
    shippingBody: formStages.stage1
      ? "accordion-collapse collapse"
      : "accordion-collapse collapse show",
    shippingHead: formStages.stage1
      ? "accordion-button collapsed"
      : "accordion-button",
  };
  return accordion;
};
