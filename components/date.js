
import { parse, format } from 'date-fns';

export default function FormattedDate({ dateString } = {}) {
  if (!dateString) {
    return null;
  }

  const date = parse(
    String(dateString),
    'yyyyMMdd',
    new Date()
  );

  if (isNaN(date.getTime())) {
    return null;
  }

  return (
    <time dateTime={String(dateString)}>
      {format(date, 'LLLL d, yyyy')}
    </time>
  );
}
