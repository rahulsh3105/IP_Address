//1. Getting the client's IP address.
let IP = ""
$.getJSON("https://api.ipify.org?format=json", function (data) {

    // Setting text of element P with id ipAdress
    IP = data.ip
    $("#ipAdress").html(`MY Public IP ADDRESS: ${data.ip}`);
})

let pincode
let PostOfficeArray = []
let PostOfficeArray2 = []
const form = document.getElementById("form")
const getData = async () => {
    try {
        const response = await fetch(`https://ipinfo.io/[${IP}]?token=1d99cc3cc97361`)
        const data = await response.json()
        console.log(data);
        const [latitude, longitude] = data.loc.split(',')
        const city = data.city
        const org = data.org
        const region = data.region
        const timezone = data.timezone
        pincode = data.postal
        const map = document.getElementById("iframe")
        console.log(data.loc[1]);
        document.getElementById("lat").textContent = `Lat: ${latitude}`
        document.getElementById("city").textContent = `City: ${city}`
        document.getElementById("organisation").textContent = `Organisation: ${org}`
        document.getElementById("long").textContent = `long: ${longitude}`
        document.getElementById("region").textContent = `Region: ${region}`
        document.getElementById("hostname").textContent = `Hostname: Hostname`
        document.getElementById("time-zone").textContent = `Time Zone: ${timezone}`
        document.getElementById("pincode").textContent = `Pincode: ${pincode}`

        document.getElementById("iframe").style.display = 'block'
        map.src = `https://maps.google.com/maps?q=${latitude}, ${longitude}&z=15&output=embed`

        //display the users time from timezone fetched.
        const date = new Date()
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).format(date)
        const dateTime = document.getElementById("dateTime")
        dateTime.textContent = `Time: ${formattedDate}`

        //another req to another API
        const postalApi = async () => {
            const postalResponse = await fetch(`https://api.postalpincode.in/pincode/${pincode}`)
            const postalData = await postalResponse.json()

            // console.log(postalData[0].PostOffice)
            let PostOfficeArray = postalData[0].PostOffice
            console.log(PostOfficeArray);

            //creating postoffice boxes
            let postOffices = document.getElementById("post-offices")
            PostOfficeArray.forEach((office) => {
                console.log(office.Name)
                const div = document.createElement('div')
                div.classList.add("postoffice-box")
                const officeName = document.createElement('p') // create para for office name and append it to div
                officeName.textContent = `Name: ${office.Name}`
                div.appendChild(officeName)

                const branchType = document.createElement('p')
                branchType.textContent = `BranchType: ${office.BranchType}`
                div.appendChild(branchType)

                const deliveryStatus = document.createElement('p')
                deliveryStatus.textContent = `DeliveryStatus: ${office.DeliveryStatus}`
                div.appendChild(deliveryStatus)

                const district = document.createElement('p')
                district.textContent = `District: ${office.District}`
                div.appendChild(district)

                const division = document.createElement('p')
                division.textContent = `Division: ${office.Division}`
                div.appendChild(division)
                postOffices.appendChild(div)
            });

            console.log(PostOfficeArray);
            //search and filter
            const search = document.getElementById("searchButton")
            const searchValue = document.getElementById("search-term")
            PostOfficeArray.forEach((office) => {
                search.addEventListener("click", () => {
                    if (office.Name.includes(searchValue.value) || office.BranchType.includes(searchValue.value)) {
                        let results = document.getElementById("results")
                        const div = document.createElement('div')
                        div.classList.add("postoffice-box")
                        const officeName = document.createElement('p') // create para for office name and append it to div
                        officeName.textContent = `Name: ${office.Name}`
                        div.appendChild(officeName)

                        const branchType = document.createElement('p')
                        branchType.textContent = `BranchType: ${office.BranchType}` //creating branch
                        div.appendChild(branchType)

                        const deliveryStatus = document.createElement('p')
                        deliveryStatus.textContent = `DeliveryStatus: ${office.DeliveryStatus}` //delivery sttus
                        div.appendChild(deliveryStatus)

                        const district = document.createElement('p')
                        district.textContent = `District: ${office.District}` //district 
                        div.appendChild(district)

                        const division = document.createElement('p')
                        division.textContent = `Division: ${office.Division}` //division
                        div.appendChild(division)

                        results.appendChild(div)
                        document.getElementById("post-offices").style.display = 'none'
                    }
                })
            })
        }
        postalApi()

        button.style.display = "none"
        form.style.display = "block"
        console.log(PostOfficeArray2);
    }
    catch (error) {
        console.log(error, "cant fetch data");
    }
}
const button = document.getElementById("button")
button.onclick = getData