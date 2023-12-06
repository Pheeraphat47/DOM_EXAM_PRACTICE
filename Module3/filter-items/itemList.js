import { products } from './data/products.js';

function itemList(userItems) {
  const items = userItems;

  const initialPage = () => {
    // ฟังก์ชันนี้เริ่มต้นหน้าเว็บโดยตั้งค่าตัวฟังก์ชันรับเหตุการณ์และแสดงรายการรายการเริ่มต้น

    const inputElem = document.querySelector('input');
    inputElem.addEventListener('keydown', filterItemsHandler); // เพิ่มตัวฟังก์ชันรับเหตุการณ์ไปยังฟิลด์อินพุตเพื่อจัดการการกดแป้น
    showItems(items); // แสดงรายการรายการเริ่มต้น
  };

  const filterItemsHandler = () => {
    // ฟังก์ชันนี้กรองรายการรายการตามอินพุตของผู้ใช้

    const inputElemValue = document.querySelector('input').value.toLowerCase(); // รับค่าอินพุตและแปลงเป็นอักษรตัวพิมพ์เล็ก
    const filterArray = items.filter((word) => word.keywords.toLowerCase().includes(inputElemValue)); // กรองรายการตามอินพุต
    showItems(filterArray); // แสดงรายการรายการที่กรองแล้ว
  };

  const showItems = (items) => {
    // ฟังก์ชันนี้แสดงรายการรายการใน DOM

    const ul = document.getElementById('items'); // รับองค์ประกอบรายการจาก DOM
    ul.textContent = ''; // ล้างเนื้อหาที่มีอยู่ของรายการ

    for (let index = 0; index < items.length; index++) { // วนซ้ำผ่านอาร์เรย์รายการ
      const createLi = document.createElement('li'); // สร้างองค์ประกอบรายการรายการใหม่
      createLi.textContent = `ID:${items[index].id}, NAME:${items[index].name}, KEYWORDS:${items[index].keywords}`; // ตั้งค่าเนื้อหาขององค์ประกอบรายการรายการ
      ul.appendChild(createLi); // เพิ่มองค์ประกอบรายการรายการลงในรายการ
    }
  };

  return {
    initialPage, // คืนค่าฟังก์ชัน initialPage
    filterItemsHandler, // คืนค่าฟังก์ชัน filterItemsHandler
    showItems, // คืนค่าฟังก์ชัน showItems
  };
}

export { itemList };

const { initialPage, filterItemsHandler, showItems } = itemList(products);
initialPage();
