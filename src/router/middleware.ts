export async function loadLayoutMiddleware(route: any) {
  try {
    let layout = route.meta.layout.__name;

    // let layoutComponent = await import(`@/layouts/${layout}.vue`);
    // route.meta.layoutComponent = layoutComponent.default;
    // console.log(layoutComponent);
  } catch (e) {
    let layout = "AppLayout";
    let layoutComponent = await import(`@/layouts/${layout}.vue`);
    route.meta.layoutComponent = layoutComponent.default;
    console.log('catch',layoutComponent);
  }
}