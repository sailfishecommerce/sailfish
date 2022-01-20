import {
  addCartItemVboutType,
  addCategoryViewVboutType,
  addProductViewVboutType,
  createVboutContentType,
  createVboutOrderType,
  updateVboutCartContentType,
} from "@/types";
import axios from "axios";

export default function useVbout() {
  function addNewUserToList(email: string) {
    const data: any = {
      email,
      status: "active",
      listid: 55592,
    };

    return axios.post(
      `https://api.vbout.com/1/emailmarketing/addcontact.json?key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`,
      data
    );
  }

  function createVboutCart(content: createVboutContentType) {
    const data = {
      uniqueid: content.id,
      cartid: content.cartId,
      domain: "VBT-88360-6048",
      cartcurrency: "$",
      customer: content.email,
      storename: "livehealthy",
      customerinfo: content.customerInfo,
    };
    return axios
      .post(
        `https://api.vbout.com/1/ecommerce/createcart?api_key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`,
        data
      )
      .then((response) => console.log("createVboutCart response", response))
      .catch((error) => console.error("error createVboutCart", error));
  }

  function updateVboutCart(content: updateVboutCartContentType) {
    const data = {
      customer: content.email,
      uniqueid: content.id,
      cartid: content.cartId,
      domain: "VBT-88360-6048",
      cartcurrency: "$",
      storename: "livehealthy",
      customerinfo: {
        firstname: content.firstName,
        lastname: content.lastName,
        company: content.company,
        country: content.country,
      },
    };
    axios.post(
      `https://api.vbout.com/1/ecommerce/updatecart?api_key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`,
      data
    );
  }

  function addCartItemVbout(content: addCartItemVboutType) {
    const data = {
      domain: "VBT-88360-6048",
      customer: content.email,
      uniqueid: content.id,
      cartid: content.cartId,
      currency: "$",
      productid: content.productId,
      name: content.productName,
      price: content.price,
      quantity: content.quantity,
      image: content.productImage,
    };
    axios
      .post(
        `https://api.vbout.com/1/ecommerce/addcartitem?api_key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`,
        data
      )
      .then((response) => console.log("addCartItemVbout", response))
      .catch((error) => console.error("error addCartItemVbout", error));
  }

  function removeVboutCart(cartid: string) {
    const data = {
      domain: "VBT-88360-6048",
      cartid,
    };
    axios.post(
      `https://api.vbout.com/1/ecommerce/removecart?api_key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`,
      data
    );
  }

  type removeVboutCartType = {
    cartId: string;
    productId: string;
  };

  function removeVboutCartItem(item: removeVboutCartType) {
    const data = {
      domain: "VBT-88360-6048",
      cartid: item.cartId,
      productid: item.productId,
    };
    axios.post(
      `https://api.vbout.com/1/ecommerce/removecartitem?api_key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`,
      data
    );
  }

  function createVboutOrder(item: createVboutOrderType) {
    const data = {
      domain: "VBT-88360-6048",
      cartid: item.cartId,
      uniqueid: item.uniqueId,
      orderid: item.orderId,
      ordernumber: item.orderNumber,
      paymentmethod: item.paymentMethod,
      grandtotal: item.grandTotal,
      subtotal: item.subtotal,
      currency: "USD",
      status: item.status,
      storename: "livehealthy",
      customerinfo: item.customerInfo,
      billinginfo: item.billingInfo,
      shippinginfo: item.shippingInfo,
    };
    return axios
      .post(
        `https://api.vbout.com/1/ecommerce/createorder?api_key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`,
        data
      )
      .then((response) => console.log("createVboutOrder", response))
      .catch((error) => console.error("error createVboutOrder", error));
  }

  function addProductViewVbout(item: addProductViewVboutType) {
    const data = {
      domain: "VBT-88360-6048",
      uniqueid: item.id,
      currency: "USD",
      productid: item.productId,
      name: item.productName,
      price: item.price,
      image: item.productImage,
      description: item.description,
      link: item.link,
    };
    return axios
      .post(
        `https://api.vbout.com/1/ecommerce/addproductview?api_key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`,
        data
      )
      .then((response) => console.log("addProductViewVbout", response))
      .catch((error) => console.error("error addProductViewVbout", error));
  }

  function addCategoryViewVbout(item: addCategoryViewVboutType) {
    const data = {
      domain: "VBT-88360-6048",
      uniqueid: item.id,
      categoryid: item.categoryId,
      name: item.productName,
      image: item.categoryImage,
    };
    return axios.post(
      `https://api.vbout.com/1/ecommerce/addcategoryview?api_key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`,
      data
    );
  }

  function sendBankTransfer(email: string, listid: string) {
    const data = {
      email,
      status: "active",
      listid,
    };
    return axios.post(
      `https://api.vbout.com/1/emailmarketing/addcontact.json?key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`,
      data
    );
  }

  type addProductSearchType = {
    id: string;
    email: string;
    query: string;
  };

  function addProductSearch(content: addProductSearchType) {
    const data = {
      domain: "VBT-88360-6048",
      uniqueid: content.id,
      customer: content.email,
      query: content.query,
    };
    return axios.post(
      `https://api.vbout.com/1/ecommerce/addproductsearch?key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`,
      data
    );
  }

  type addCategoryViewType = {
    id: string;
    categoryId: string;
    categoryName: string;
    categoryLink: string;
    categoryImage: string;
  };

  function addCategoryView(content: addCategoryViewType) {
    const data = {
      domain: "VBT-88360-6048",
      uniqueid: content.id,
      categoryid: content.categoryId,
      name: content.categoryName,
      link: content.categoryLink,
      image: content.categoryImage,
    };
    return axios.post(
      `https://api.vbout.com/1/ecommerce/addcategoryview?api_key=${process.env.NEXT_PUBLIC_VBOUT_API_KEY}`,
      data
    );
  }

  return {
    addNewUserToList,
    createVboutCart,
    updateVboutCart,
    addCartItemVbout,
    addProductSearch,
    removeVboutCart,
    removeVboutCartItem,
    addProductViewVbout,
    createVboutOrder,
    addCategoryViewVbout,
    sendBankTransfer,
    addCategoryView,
  };
}
