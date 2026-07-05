$(document).ready(function () {

    $("#darkModeBtn").click(function () {

        $("body").toggleClass("dark-mode");

        if ($("body").hasClass("dark-mode")) {
            $(this).text("Light Mode");
        } else {
            $(this).text("Dark Mode");
        }

    });

    $(".category-card").hover(
        function () {
            $(this).css("transform", "translateY(-10px)");
        },
        function () {
            $(this).css("transform", "translateY(0)");
        }
    );

    $(".restaurant-card").hover(
        function () {
            $(this).css("transform", "translateY(-10px)");
        },
        function () {
            $(this).css("transform", "translateY(0)");
        }
    );

    $(".btn-main").click(function () {

        $(this).animate({
            opacity: 0.7
        }, 100);

        $(this).animate({
            opacity: 1
        }, 100);

    });

});
$("#searchInput").on("keyup", function () {

    let value = $(this).val().toLowerCase();

    $(".restaurant-item").filter(function () {

        $(this).toggle(
            $(this).text().toLowerCase().indexOf(value) > -1
        );

    });

});

$(".filter-btn").click(function () {

    let value = $(this).attr("data-filter");

    if (value === "all") {
        $(".restaurant-item").show();
    }
    else {
        $(".restaurant-item").hide();
        $("." + value).show();
    }

});

$(".increase").click(function () {

    let qty = parseInt($(".qty").text());

    qty++;

    $(".qty").text(qty);

    $("#grandTotal").text(qty * 249);

    $(".itemTotal").text("₹" + qty * 249);

});

$(".decrease").click(function () {

    let qty = parseInt($(".qty").text());

    if(qty > 1){

        qty--;

        $(".qty").text(qty);

        $("#grandTotal").text(qty * 249);

        $(".itemTotal").text("₹" + qty * 249);

    }

});
$("#checkoutForm").submit(function(e){

    e.preventDefault();

    let name = $("#name").val();
    let mobile = $("#mobile").val();
    let email = $("#email").val();
    let address = $("#address").val();

    if(name === "" || mobile === "" || email === "" || address === ""){

        alert("Please fill all fields");

        return;

    }

    if(mobile.length !== 10){

        alert("Enter valid mobile number");

        return;

    }

    alert("Order Placed Successfully!");

    this.reset();

});
$(".add-cart").click(function () {

    let item = {
        name: $(this).data("name"),
        price: $(this).data("price")
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(item);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(item.name + " added to cart");

    $("#cartCount").text(cart.length);

});

$(document).ready(function () {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    $("#cartCount").text(cart.length);

});
$(document).ready(function () {

    if ($("#cartItems").length) {

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        let output = "";

        let total = 0;

        cart.forEach(function(item, index){

            total += Number(item.price);

            output += `
            <div class="card mb-3">
                <div class="card-body d-flex justify-content-between align-items-center">

                    <div>
                        <h5>${item.name}</h5>
                        <p>₹${item.price}</p>
                    </div>

                    <button class="btn btn-danger removeItem" data-index="${index}">
                        Remove
                    </button>

                </div>
            </div>
            `;

        });

        $("#cartItems").html(output);

        $("#grandTotal").text(total);

    }

});
$(document).on("click", ".removeItem", function () {

    let index = $(this).data("index");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();

});
$(window).scroll(function(){

    if($(this).scrollTop() > 200){
        $("#topBtn").fadeIn();
    }
    else{
        $("#topBtn").fadeOut();
    }

});

$("#topBtn").click(function(){

    $("html, body").animate({
        scrollTop:0
    },600);

});
$("#contactForm").submit(function(e){

    e.preventDefault();

    let name = $("#contactName").val();
    let email = $("#contactEmail").val();
    let subject = $("#contactSubject").val();
    let message = $("#contactMessage").val();

    if(name === "" || email === "" || subject === "" || message === ""){

        alert("Please fill all fields");

        return;

    }

    alert("Thank you! Your message has been sent.");

    this.reset();

});
$("#loginBtn").click(function(){

    let email = $("#loginEmail").val();
    let password = $("#loginPassword").val();

    if(email === "" || password === ""){

        alert("Please enter email and password");

        return;

    }

    alert("Login Successful");

    $("#loginModal").modal("hide");

});
$("#registerBtn").click(function(){

    alert("Registration Feature Coming Soon");

});
$(document).on("click", "#loginBtn", function(){

    let email = $("#loginEmail").val();
    let password = $("#loginPassword").val();

    if(email === "" || password === ""){
        alert("Please enter email and password");
        return;
    }

    alert("Login Successful");

});

$(document).on("click", "#createAccountBtn", function(){

    let name = $("#regName").val();
    let email = $("#regEmail").val();
    let password = $("#regPassword").val();
    let confirmPassword = $("#regConfirmPassword").val();

    if(name === "" || email === "" || password === "" || confirmPassword === ""){
        alert("Please fill all fields");
        return;
    }

    if(password !== confirmPassword){
        alert("Passwords do not match");
        return;
    }

    alert("Account Created Successfully!");

});
$(".counter").each(function () {

    let $this = $(this);
    let target = parseInt($this.attr("data-target"));

    $({ countNum: 0 }).animate(
        {
            countNum: target
        },
        {
            duration: 2000,
            easing: "swing",
            step: function () {
                $this.text(Math.floor(this.countNum));
            },
            complete: function () {

                if (target === 48) {
                    $this.text("4.8★");
                } else {
                    $this.text(target + "+");
                }

            }
        }
    );

});
$("#applyCoupon").click(function(){

    let code = $("#couponCode").val();

    let total = parseInt($("#grandTotal").text());

    if(code === "SAVE50"){

        total = total - 50;

        $("#grandTotal").text(total);

        alert("Coupon Applied!");

    }
    else{

        alert("Invalid Coupon Code");

    }

});