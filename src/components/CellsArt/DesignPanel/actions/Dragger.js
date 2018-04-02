export default ({ object, startPoint, mouse }) => {
  object.styles.x = mouse.x - (startPoint.clientX - startPoint.objectX);
  object.styles.y = mouse.y - (startPoint.clientY - startPoint.objectY);
  return object;
};
