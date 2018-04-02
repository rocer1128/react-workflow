export default ({ object, startPoint, mouse }) => {
  let { objectX, objectY, clientX, clientY } = startPoint;
  let width = startPoint.width + mouse.x - clientX;
  let height = startPoint.height + mouse.y - clientY;

  object.styles.x = width > 0 ? objectX : objectX + width;
  object.styles.y = height > 0 ? objectY : objectY + height;
  object.styles.width = Math.abs(width);
  object.styles.height = Math.abs(height);
  return object;
};
