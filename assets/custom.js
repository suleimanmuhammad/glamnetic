

// function close_Product_Popup() {
//   $(".popupBox").removeClass("slideInDown");
//   $(".popupBox").addClass("slideOutUp");
//   $(".popupOverlay.product_popup").fadeOut("slow");
//   $("body").removeClass("productpopupOpen");
// }
// function open_Product_Popup(a) {
//   $(".popupBox").addClass("slideInDown");
//   $(".popupBox").removeClass("slideOutUp");
//   $(".popupOverlay.product_popup").fadeIn("slow");
//   $("body").addClass("productpopupOpen");
// }

// $(document).ready(function() {
//   function addToCartSuccess() {
//     $.get("/cart?view=mini", function(data) {
//       $("#crt").html(data);
//       $("#crt").removeClass("loading");
//     });
//   }

//   function refreshCart(cart) {
//     $(".cart-count").text(cart.item_count);
//   }

//   $("body").on("click", ".the-cart-btn", function(e) {
//     e.preventDefault();

//     var btn = $(this);
//     var form = $(this).closest("form");
//     var btn_is_collection_trynow = $(this).hasClass(
//       "trynow-collection-buttonAddtoCart"
//     );
//     btn.attr("disabled", "disabled");
//     // btn.text("adding...");
//     form.find(".error").remove();
//     console.log(btn);
//     console.log(form);
//     //one pro popupp on cart at first time
//     var pop_pro_id = $(".product-detail").attr("data-popproid");
//     var current_col = $(".product-detail").attr("data-cid");
// //     var col_by_client = $(".product-detail").attr("data-client");
// //     var col_space = col_by_client.split(",");
//     var current_col_pro_ids = $(".product-detail").attr("data-array");
//     var pro_hidden_id = form.find("#pro_id_hidden").val();

//     var arry_cart_pro_id = [];

//     $.getJSON("/cart.js", function(cart_data_quick) {
//       $.each(cart_data_quick.items, function(index, item_pro_cart) {
//         var p_id_pop = item_pro_cart.product_id;
//         var p_id_pop = $.trim(p_id_pop);
//         arry_cart_pro_id.push(p_id_pop);
//       });
// //       if (current_col == col_by_client) {
//         if (current_col_pro_ids.indexOf(pro_hidden_id) > -1) {
//           if (arry_cart_pro_id.indexOf(pop_pro_id) > -1) {
//             console.log("no pop 3rd");
//           } else {
//             $("body").addClass("custom_popup");
//             open_Product_Popup();
//           }
//         } else {
//           console.log("no pop sec");
//         }
// //       } else {
// //         console.log("no pop first");
// //       }
//     });
//     $.ajax({
//       type: "POST",
//       url: "/cart/add.js",
//       data: form.serialize(),
//       dataType: "json",
//       error: function(jqXHR, textStatus, errorThrown) {
//         var response = $.parseJSON(jqXHR.responseText);
//         form
//           .append('<p class="error">' + response.description + "</p>")
//           .find(".error")
//           .fadeIn()
//           .delay(4000)
//           .fadeOut();
//         // btn.text("add to cart");
//         $("body").addClass("cartOpen");
//         $(".main_content").addClass("witmenu");
//         btn.removeAttr("disabled");
//       }
//     }).done(function(data) {
//       console.log(data);
//       addToCartSuccess();
//       btn.text(
//         btn_is_collection_trynow
//           ? "try for free"
//           : "buy it now - $" + data.original_price / 100
//       );
//       btn.removeAttr("disabled");
//       $.getJSON("/cart.js", function(cart) {
//         refreshCart(cart);
//       });
//       $("body").addClass("cartOpen");
//       $(".main_content").addClass("witmenu");
//     });
//   });

//   //INIT TRYNOW
//   $("body").on("click", "button#tryNow", function(e) {
//     e.preventDefault();
//     var btn = $(this);
//     var form = $(this).closest("form");
//     btn.attr("disabled", "disabled");
//     form.find(".error").remove();
//     var trynow = false;
//     // Before adding, get cart and check for trynow items. If none exist, do add.
//     $.getJSON("/cart.js", function(cart) {
//       if (cart.item_count > 0) {
//         $.each(cart.items, function(index, product) {
//           console.log(product);
//           $.each(product.properties, function(i, p) {
//             if (i == "TryNow" && p == "true") {
//               console.log("setting to true");
//               trynow = true;
//             }
//           });
//         });
//       }
//     }).done(function() {
//       if (!trynow) {
//         $.ajax({
//           type: "POST",
//           url: "/cart/add.js",
//           data:
//             $.param({ properties: { TryNow: "true" } }) +
//             "&" +
//             form.serialize(),
//           dataType: "json",
//           error: function(jqXHR, textStatus, errorThrown) {
//             var response = $.parseJSON(jqXHR.responseText);
//             form
//               .append('<p class="error">' + response.description + "</p>")
//               .find(".error")
//               .fadeIn()
//               .delay(4000)
//               .fadeOut();
//             btn.text("TRY FOR FREE");
//             btn.removeAttr("disabled");
//           }
//         }).done(function(data) {
//           addToCartSuccess();
//           refreshCart(data);
//           $("body").addClass("cartOpen");
//           $(".main_content").addClass("witmenu");
//         });
//       } else {
//         $(".message").remove();
//         $(".topcart-btn").append(
//           "<h6 class='message' style='color:#ff0000'><center>You can only have 1 Try For Free item in your cart.</center></h5>"
//         );
//         $("body").addClass("cartOpen");
//         $(".main_content").addClass("witmenu");
//         setTimeout(function() {
//           $(".message").remove();
//         }, 4000);
//       }
//     });
//     btn.removeAttr("disabled");
//   });
//   //END TRYNOW

//   $("#mini_cart, #des_mini_cart").on("click", function(e) {
//     e.preventDefault();
//     if ($(this).hasClass("active")) {
//       $("body").removeClass("cartOpen");
//       $(".main_content").removeClass("witmenu");
//       $(this).removeClass("active");
//     } else {
//       $(this).addClass("active");
//       $("body").addClass("cartOpen");
//       $(".main_content").addClass("witmenu");
//     }
//   });

//   $("body").on("click", ".closecart", function(e) {
//     e.preventDefault();
//     $(".main_content").removeClass("witmenu");
//     $("body").removeClass("cartOpen");
//     $("#mini_cart, #des_mini_cart").removeClass("active");
//   });

//   $(".main_content.witmenu").on("click", function(e) {
//     e.preventDefault();
//     $(this).removeClass("witmenu");
//     $("body").removeClass("cartOpen");
//     $("#mini_cart, #des_mini_cart").removeClass("active");
//   });

//   $("body").on("click", ".adjust", function() {
//     // START TRYNOW CODE
//     // If adjust button has 'trynow-adjust' class, return and do nothing
//     // Since you can only have 1 TryNow item in your cart.
//     if ($(this).hasClass("trynow-adjust")) {
//       return;
//     }
//     var input = $(this)
//       .parent()
//       .find("input");
//     var line = $(this).data().line;
//     var ip = parseInt(input.val());
//     if ($(this).hasClass("plus")) {
//       ip = ip + 1;
//     } else {
//       ip = ip - 1;
//     }
//     if (ip == 0) {
//       return false;
//     }
//     input.val(ip);

//     $("#crt").addClass("loadings");
//     var id = parseInt(input.attr("data-id"));
//     $.ajax({
//       type: "POST",
//       url: "/cart/change.js",
//       data: {
//         line: line,
//         quantity: ip
//       },
//       dataType: "json",
//       error: function(jqXHR, textStatus, errorThrown) {
//         var response = $.parseJSON(jqXHR.responseText);
//         alert(response.description);
//         $("#crt").removeClass("loading");
//       }
//     }).done(function(data) {
//       addToCartSuccess();
//       $.getJSON("/cart.js", function(cart) {
//         refreshCart(cart);
//       });
//       $("#crt").removeClass("loading");
//     });
//   });
//   // Handle remove from cart. Remove is done by line and not id.
//   $("#crt").on("click", "a.remove_item", function(r) {
//     $("#crt").addClass("loadings");
//     r.preventDefault();
//     var key = $(this).data("id");
//     var line = $(this).data("line");
//     $.ajax({
//       type: "POST",
//       url: "/cart/change.js",
//       data: {
//         line: line,
//         quantity: 0
//       },
//       dataType: "json",
//       error: function(jqXHR, textStatus, errorThrown) {
//         var response = $.parseJSON(jqXHR.responseText);
//         form
//           .append('<p class="error">' + response.description + "</p>")
//           .find(".error")
//           .fadeIn()
//           .delay(4000)
//           .fadeOut();
//         btn.text("TRY FOR FREE");
//         btn.removeAttr("disabled");
//       }
//     }).done(function(c) {
//       $(".cart-count").text(c.item_count);
//       if (!c.item_count) {
//         $(".mini_cart").empty();
//         $(".mini_cart")
//           .append()
//           .html(
//             '<p class="emptyCart text-center"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="38.715px" height="49.314px" viewBox="0 0 38.715 49.314" enable-background="new 0 0 38.715 49.314" xml:space="preserve"> <path fill-rule="evenodd" clip-rule="evenodd" d="M19.053,45.665c-4.841,0-9.682,0-14.523,0c-0.989,0-1.342-0.353-1.283-1.34 c0.268-4.408,0.548-8.814,0.822-13.221c0.211-3.39,0.42-6.78,0.629-10.17c0.177-2.853,0.35-5.707,0.531-8.56 c0.053-0.826,0.419-1.162,1.252-1.164c1.897-0.005,3.793-0.012,5.69,0.007c0.382,0.004,0.557-0.09,0.688-0.48 c0.621-1.842,1.472-3.565,2.951-4.885c2.25-2.008,4.95-1.84,6.99,0.393c1.187,1.298,1.985,2.818,2.527,4.474 c0.134,0.409,0.325,0.502,0.718,0.498c1.854-0.019,3.708-0.009,5.563-0.008c0.985,0.001,1.307,0.324,1.368,1.315 c0.36,5.819,0.727,11.639,1.088,17.458c0.268,4.323,0.533,8.645,0.799,12.967c0.029,0.466,0.056,0.933,0.087,1.399 c0.063,0.952-0.282,1.317-1.249,1.317C28.82,45.665,23.937,45.665,19.053,45.665z M5.319,43.605c9.194,0,18.359,0,27.562,0 c-0.634-10.131-1.266-20.237-1.897-30.333c-1.679,0-3.296,0-4.937,0c0.029,0.179,0.059,0.317,0.071,0.456 c0.138,1.478,0.278,2.955,0.406,4.434c0.038,0.444-0.127,0.81-0.532,1.029c-0.703,0.381-1.431-0.111-1.503-0.964 c-0.129-1.521-0.295-3.038-0.441-4.557c-0.031-0.319-0.16-0.447-0.511-0.445c-2.958,0.016-5.917,0.015-8.876,0.001 c-0.343-0.002-0.485,0.11-0.517,0.438c-0.145,1.491-0.313,2.979-0.439,4.471c-0.061,0.726-0.442,1.199-1.052,1.182 c-0.599-0.016-1.014-0.489-0.979-1.193c0.053-1.073,0.133-2.146,0.228-3.216c0.048-0.545,0.154-1.084,0.24-1.672 c-1.587,0-3.142-0.004-4.696,0.013c-0.086,0.001-0.229,0.182-0.244,0.293c-0.049,0.363-0.049,0.733-0.072,1.101 c-0.302,4.832-0.605,9.663-0.91,14.495c-0.214,3.404-0.429,6.809-0.643,10.213C5.49,40.758,5.407,42.167,5.319,43.605z M23.353,11.184c-0.622-1.587-1.313-3.032-2.631-4.066c-1.078-0.846-2.179-0.844-3.259,0.004c-1.233,0.969-1.915,2.316-2.489,3.729 c-0.04,0.097-0.053,0.204-0.085,0.333C17.71,11.184,20.491,11.184,23.353,11.184z"></path> </svg> No Products in the cart.</p>'
//           );
//         $("#crt").removeClass("has-item");
//         $("#crt").removeClass("loadings");
//         $.getJSON("/cart.js", function(cart) {
//           refreshCart(cart);
//         });
//         addToCartSuccess();
//       } else {
//         addToCartSuccess();
//       }
//     });
//     $.getJSON("/cart.js", function(cart) {
//       refreshCart(cart);
//     });
//   });

//   $("body").on("click", ".cls_popups", function(e) {
//     e.preventDefault();
//     close_Product_Popup();
//   });
//   $(document).keyup(function(e) {
//     if (e.keyCode == 27) {
//       close_Product_Popup();
//     }
//   });
//   window.onclick = function(e) {
//     if ($(e.target).hasClass("product_popup")) {
//       close_Product_Popup();
//     }
//   };

//   $("body").on("click", ".productpopup", function(e) {
//     e.preventDefault();
//     var btn = $(this);
//     var form = $(this).closest("form");
//     btn.attr("disabled", "disabled");
//     btn.text("adding...");
//     form.find(".error").remove();

//     $.ajax({
//       type: "POST",
//       url: "/cart/add.js",
//       data: form.serialize(),
//       dataType: "json",
//       error: function(jqXHR, textStatus, errorThrown) {
//         var response = $.parseJSON(jqXHR.responseText);
//         form
//           .append('<p class="error">' + response.description + "</p>")
//           .find(".error")
//           .fadeIn()
//           .delay(4000)
//           .fadeOut();
//         btn.text("add to cart");
//         btn.removeAttr("disabled");
//       }
//     }).done(function(data) {
//       addToCartSuccess();
//       btn.text("add to cart");
//       btn.removeAttr("disabled");
//       $.getJSON("/cart.js", function(cart) {
//         refreshCart(cart);
//       });
//       $(".productGrid .productItem").removeClass("qvopen");
//       $("body").addClass("cartOpen");
//       $(".main_content").addClass("witmenu");
//       $(".popupOverlay.product_popup").fadeOut("slow");
//     });
//   });
// });
// jQuery(document).ready(function() {
//   jQuery(".variation-holder a img[alt='Set with liquid liner']").click(
//     function() {
//       jQuery("#SingleOptionSelector-0")
//         .val("Set with liquid liner")
//         .change();
//     }
//   );
//   jQuery(".variation-holder a img[alt='Set with gel liner']").click(function() {
//     jQuery("#SingleOptionSelector-0")
//       .val("Set with gel liner")
//       .change();
//   });
// });












// jQuery(document).ready(function(){
//   /* START TRY NOW MODAL*/ 
//   $(document).on("click", ".close", function() {
//     $('.modal-overlay').removeClass('show');
//     $('.modal-overlay').hide();
//   });

//   $(document).mouseup(function(e) {
//     var container = $(".modal");
//     if (!container.is(e.target) && container.has(e.target).length === 0) {
//       $('.modal-overlay').removeClass('show');
//       $('.modal-overlay').hide();
//     }
//   });

//   $(document).on("touchend" ,function(e) {
//     var container = $(".modal");
//     if (!container.is(e.target) && container.has(e.target).length === 0) {
//       $('.modal-overlay').removeClass('show');
//       $('.modal-overlay').hide();
//     }
//   });

//   $(document).on("click", ".popup-try-now-how-work", function() {
//     $('.modal-overlay').addClass('show');
//     $('.modal-overlay').show();
//   });
//   /* END TRY NOW MODAL*/ 
  
//   /* Redirect to custom checkout when trynow checkout button is clicked. */
//   $(document).on("click", ".trynow-checkout-button", function(e) {
//     e.preventDefault();
//    	window.location.href = $(this).data().url;
//   });
  
// });