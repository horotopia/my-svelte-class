/** @type {import('./$types').PageLoad} */
export function load({ url }) {
  console.log('page load called', url.pathname);
}
