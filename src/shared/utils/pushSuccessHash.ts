export function pushSuccessHash(hash: string) {
  const params = new URLSearchParams(window.location.search);

  // Force put success at the first place
  // Because it is needed by FB retargeting team
  params.delete('success');
  const stringParams = params.toString();
  window.history.pushState(
    {},
    '',
    `${window.location.pathname}?success=${hash}${
      stringParams ? '&' + params : ''
    }`,
  );
}
