import get from 'lodash/get';

export const completedOrder = order => {
  const name = get(order, 'receiverName', '');
  const phone = get(order, 'receiverPhone', '');
  const email = get(order, 'profile.email', '');
  const total = get(order, 'total', '');

  const orderId = get(order, 'orderId', '');
  const orderInfo = get(order, 'items', [])
    .map(item => {
      const productName = get(item, 'product.name', '');
      const price = get(item, 'pricePerProduct', 0);
      const quantity = get(item, 'quantity', 0);
      return `${productName}(Qty:${quantity}, Price:${price})`;
    })
    .join(' | ');

  return `var cname = 'string';
	var cname = '${name}';
	var ctel = '${phone}';
	var cemail = '${email}';
	var cinfo = '${orderId} | ${orderInfo}';
	var price = ${total};

  window.rtAsyncInit = function() {
    return {
      sid: 251,
      pid: 70966,
      price: price,
      reward: -1,
      cname: cname,
      ctel: ctel,
      cemail: cemail,
      cinfo: cinfo,
    };
  };`;
};

export const addScriptRentracks = order => {
  const content = completedOrder(order);
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.id = 'completedOrderTracking';
  script.innerHTML = content;
  document.head.appendChild(script);
  // // add script SDK rentracks
  // const scriptSDK = document.createElement('script');
  // scriptSDK.type = 'text/javascript';
  // scriptSDK.id = 'rentracksSDK';
  // scriptSDK.async = true;
  // scriptSDK.defer = true;
  // scriptSDK.src = 'https://track.rentracksw.com/js/rt.sdk.js';
  // document.head.appendChild(scriptSDK);
};

export const removeScriptRentracks = () => {
  const scriptTag = document.querySelector(
    `script[id="completedOrderTracking"]`,
  );
  if (scriptTag) {
    scriptTag.remove();
  }
  // const scriptTagSDK = document.querySelector(`script[id="rentracksSDK"]`);
  // if (scriptTagSDK) {
  //   scriptTagSDK.remove();
  // }
};
