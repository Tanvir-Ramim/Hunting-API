const loadPhone=async(phoneName,isShawAll)=>{
    const res =await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`)
    const data =await res.json()
    const phones =data.data
    // console.log(phones)
    displayPhones(phones,isShawAll)
}
 const displayPhones=(phones,isShawAll)=>{
    const cardContainer=document.getElementById('card-container')
            cardContainer.textContent=''
            const showAllBtn=document.getElementById('show-all-btn')
            if(phones.length>12 && !isShawAll){
               
                showAllBtn.classList.remove('hidden')
            }
            else{
                showAllBtn.classList.add('hidden')
            }
            if(!isShawAll){
                phones=phones.slice(0,12)
            }
           
        phones.forEach(element => {
            // console.log(element)
            const phoneCard=document.createElement('div')
            phoneCard.classList=`card w-96 bg-base-100 shadow-xl p-4 `
            phoneCard.innerHTML=`<figure><img src="${element.image}" /></figure>
            <div class="card-body">
              <h2 class="card-title">${element.phone_name}</h2>
              <p>Brand Name: ${element.brand}</p>
              <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${element.slug}')" class="btn btn-primary">Show Details</button>
              </div>
            </div>`
            cardContainer.appendChild(phoneCard)
        });

        // hidden loading spinner
        toggleLoadingSpinner(false)
        
 }

// handle search button

const handleSearch=(isShawAll)=>{
    toggleLoadingSpinner(true);
     const searchField=document.getElementById('search-field')
     const searchText=searchField.value 
     loadPhone(searchText,isShawAll)
     

}

const toggleLoadingSpinner=(isLoading)=>{
    const loadingSpinner=document.getElementById('loading-spinner')
    
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else
    {
        loadingSpinner.classList.add('hidden')
    }
}

function showAll(){
    handleSearch(true)
}

// show details
const handleShowDetail= async(id)=>{
    // console.log(id)
    const res=await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data=await res.json()
    const phone=data.data
    showPhoneDetails(phone)
}

const showPhoneDetails=(phone)=>{
    console.log(phone)
    const phoneName=document.getElementById('phone-name')
    phoneName.innerText=phone.name
    const showDetailContainer=document.getElementById('show-detail-container')
    showDetailContainer.innerHTML=`
    <img src="${phone.image}" alt=""/>
    <P>Storage:${phone.mainFeatures?.storage} 
    
    `
    my_modal_5.showModal()
}