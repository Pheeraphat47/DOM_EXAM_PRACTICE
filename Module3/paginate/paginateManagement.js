
// npm test CommonJS
// const { template } = require('@babel/core')
// const { getItemsOfCurrentPage, getTotalPages } = require('./lib/paginate.js')
// const products = require('./data/products.js')

// browser ES module
import { getItemsOfCurrentPage, getTotalPages } from './lib/paginate.js'
import { products } from './data/products.js'

function paginateManagement(items, rows) {
  const products = items
  const rowsPerPage = rows


  const showItemsOfCurrentPage = (currentPageNumber) => {
    const currentItem = getItemsOfCurrentPage(products, currentPageNumber, rowsPerPage) /* เรียกใช้ฟังก์ชัน getItemsOfCurrentPage() เพื่อดึงรายการสินค้าของหน้าปัจจุบัน */
    const productsUsee = document.getElementById('products') /* ค้นหาองค์ประกอบที่มี ID เท่ากับ 'products' */
    /* วนซ้ำรายการสินค้าของหน้าปัจจุบัน */
    currentItem.forEach((item) => {
      const createLi = document.createElement('li')   /* สร้างองค์ประกอบ LI ใหม่ */
      createLi.textContent = `ID:${item.id},Name:${item.name}` /* ตั้งค่าข้อความขององค์ประกอบ LI เป็น ID:ชื่อ */
      productsUsee.appendChild(createLi) /* เพิ่มองค์ประกอบ LI ลงในองค์ประกอบที่มี ID เท่ากับ 'products' */
    })


  }

  const pageHandler = (event) => {
    const productsUsee = document.getElementById('products')
    productsUsee.textContent = '' // remove previous page’s items

    const pageColor = document.querySelectorAll('button')

    pageColor.forEach((page) =>(
      page.style = 'border: 1px solid #999' // remove stylesheet of previous page button and assign to original button stylesheet 'border: 1px solid #999'
    ))
    
    const currentPage = event?.target.id ?? 1   
    // event?.target.id จะใช้เพื่อดึงค่า id ของ Element ใน event , ? 
    // ?? จะใช้เพื่อตรวจสอบว่าค่าที่ได้มีค่าหรือไม่ หากมีค่าก็จะใช้ค่านั้น หากไม่มีค่าก็จะใช้ค่าที่สองที่กำหนดไว้


     
    showItemsOfCurrentPage(currentPage)
    // adding stylesheet 'background-color: LightSteelBlue'
    const targetPageButton = document.getElementById(currentPage)
    targetPageButton.style = 'background-color: LightSteelBlue'


  }

  const showPageNumbers = () => {
    const totalPages = getTotalPages(products, rowsPerPage) // getTotalpage

    const paginate = document.querySelector('.pagination')

    /* วนซ้ำตั้งแต่ 1 ถึงจำนวนหน้าทั้งหมด */
    for (let page = 1; page <= totalPages; page++) {
      let buttonPages = document.createElement('button')  /* สร้างองค์ประกอบ button ใหม่ */
      buttonPages.textContent = page /* ตั้งค่าข้อความขององค์ประกอบ button เป็นหมายเลขหน้า */
      buttonPages.setAttribute("id", page)  /* ตั้งค่าค่าคุณสมบัติ id ขององค์ประกอบ button เป็นหมายเลขหน้า */
      paginate.appendChild(buttonPages)  /* เพิ่มองค์ประกอบ button ลงในองค์ประกอบที่มีคลาส .pagination */
      buttonPages.addEventListener('click', pageHandler)

    }// Do not forget to add button click hander function to each <button> when user click each of page number, calling pageHandler function.

  }

  return {
    showPageNumbers,
    pageHandler
  }
}


// npm test CommonJS
// module.exports = paginateManagement

// browser ES module
export { paginateManagement }
const { showPageNumbers, pageHandler } =
paginateManagement(products, 10)
showPageNumbers()
pageHandler()
