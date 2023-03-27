import React from 'react'

function Searchcontent({searchData}) {
  return (
    <div className='searchContainer'>
       <div className="serachBody">
          {
             searchData ? 
              searchData.map((item) => {
                return(<>
                   <span>{item.title}</span><br/>
                  </>
                )
              })
             : null
          }
       </div>
       <div className="Footer">

       </div>

    </div>
  )
}

export default Searchcontent