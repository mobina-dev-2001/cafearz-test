export const getLabelColor = (statusValue: string) => {
  switch (statusValue) {
    case 'ALL':
      return undefined;
    case 'NOANSWER':
      return 'error';
    case 'PENDING':
    case 'ANSWERED':
      return 'primary';
    case 'RESOLVED':
      return 'success';
    case 'WAITING_ANSWER':
      return 'warning';
    default:
      return undefined;
  }
};
