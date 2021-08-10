console.log("test")


const nypdAgency = "New York City Police Department";
const boroughts = ["BROOKLYN", "MANHATTAN", "QUEENS", "STATEN ISLAND", "BRONX"];
const numOfBoroughDivs = boroughts.length
let backgroundColors = ["red", "blue", "orange", "green", "pink"];
const defaultLimit = 10;
const appToken = "3nMPlHyMofEykN2kh1YXuq6vz";
const url = "https://data.cityofnewyork.us/resource/erm2-nwe9.json?";


$(() => {
    $("body").css({
    "background-color" : "lightgrey"
    });

    $("h2").css({
    "font-size" : "40px",
    "text-transform" : "capitalize"
    })

    $(".boroughDiv").append('<button class="getAnswers">');
    $(".getAnswers").text("check");
    
    $(".getAnswers").css({
        "height" : "64px",
        "width" : "120px",
        "color" : "white",
        "font-size" : "25px",
        "font-weight" : "bolder",
        "text-transform" : "capitalize",
        "background" : ("grey"),
        "cursor" : "pointer"
    });

    $(".paragraphDiv").append('<button class="closeResults">')
    $(".closeResults").css({
            "height" : "32px",
            "width" : "100px",
            "display" : "none"
    })

    $(".closeResults").text("Close");
    $(".closeResults").css({
        "cursor" : "pointer"
    })

    //Adding right margin and different background color styling to every borough div

    backgroundColors.forEach((item, index) => {
        $(".boroughDiv").eq(index).css({
            "background-color" : item,
            "margin-right" : "50%"
        })
    })

//Preventing default on every button

    for(let counter = 0; counter < numOfBoroughDivs; counter++) {
        let userInput;
        let paragraphStyle;
        $(".getAnswers").eq(counter).on("submit", (e) => {
            e.preventDefault();
        })
        $("h2").eq(counter).append("<input>");
        $(".closeResults").eq(counter).click(() => {
            $("p").eq(counter).html("");
            $("p").eq(counter).css({
                "width" : "0",
                "background" : "none",
                "margin" : "0",
                "padding" : "0"
        })
            $(".closeResults").eq(counter).css({
                "display" : "none"
            })
        })


        //Query each borough with specific information and display it in div when button is pressed
        
        $(".getAnswers").eq(counter).click(()=>{
            userInput = parseInt($("input:text").eq(counter).val());
            paragraphStyle = 
                $("p").eq(counter).css({
                    "width" : "50%",
                    "background" : "lightblue",
                    "margin" : "15px",
                    "padding" : "15px"
                });
            if(typeof userInput === "number" && isNaN(userInput) === false) {
                $.ajax({
                    url: url,
                    type: "GET",
                    data: {
                        "$limit" : userInput,
                        "$$app_token" : appToken,
                        "agency_name" : nypdAgency,
                        "borough" : boroughts[counter]
                    }
                }).done((data) => {
                    $("p").eq(counter).html("");
                    paragraphStyle;
                    $(".closeResults").eq(counter).css({
                        "display" : "block"
                    })
                    for (let j = 0; j < userInput; j ++) {
                        $("p").eq(counter).append(`<p>${data[j].borough}: Complaint: ${data[j].complaint_type} - ${data[j].descriptor} <button class=responseButton id=responseButton${j}>police response</button></p>\n`);
                        $(".responseButton").css({
                            "text-transform" : "capitalize",
                            "background-color" : "grey",
                            "cursor" : "pointer"
                        })
                        let toggle = true;
                        $(`#responseButton${j}`).on("click", () => {
                            if(toggle === true){
                                $(`#responseButton${j}`).text(` Resolution: ${data[j].resolution_description}`)
                                toggle = false;
                            }else {
                                $(`#responseButton${j}`).text("Police Response")
                                toggle = true;
                            }
                        })
                    }
                }) 
            } else{
                $.ajax({
                    url: url,
                    type: "GET",
                    data: {
                        "$limit" : defaultLimit,
                        "$$app_token" : appToken,
                        "agency_name" : nypdAgency,
                        "borough" : boroughts[counter]
                    }
                }).done((data) => {
                    $("p").eq(counter).html("");
                    paragraphStyle;
                    $(".closeResults").eq(counter).css({
                        "display" : "block"
                    })
                    for (let j = 0; j < defaultLimit; j ++) {
                        $("p").eq(counter).append(`<p>${data[j].borough}: Complaint: ${data[j].complaint_type} - ${data[j].descriptor} <button class=responseButton id=responseButton${j}>police response</button></p>\n`);
                        $(".responseButton").css({
                            "text-transform" : "capitalize",
                            "background-color" : "silver",
                            "cursor" : "pointer"
                        })
                        let toggle = true;
                        $(`#responseButton${j}`).on("click", () => {
                            if(toggle === true){
                                $(`#responseButton${j}`).text(` Resolution: ${data[j].resolution_description}`)
                                toggle = false;
                            }else {
                                $(`#responseButton${j}`).text("Police Response")
                                toggle = true;
                            }
                        })
                    }
                });
            }
        })
    }
    $("input:text").css({
        "margin-left" : "15px"
    })
    $("input:text").attr("placeholder", "Type a number here");

})
