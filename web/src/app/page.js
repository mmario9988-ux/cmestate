// src/app/page.js
'use client'; // บรรทัดนี้สำคัญมาก เพื่อให้เว็บทำงานบน Browser ได้สมบูรณ์

import { useState, useEffect } from 'react';

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // ฟังก์ชันดึงข้อมูลเมื่อเปิดเว็บ
  useEffect(() => {
    async function fetchData() {
      try {
        // 👇 ลิงก์ API ของพี่ (ผมใส่ให้แล้ว)
        const res = await fetch('https://script.google.com/macros/s/AKfycby59z05YE33bedqAjOCopZlJ_6mias3gfnJWzfdjPHuhoFB_uxWChHMoHSPhi-Ei0vo/exec?type=api');
        const data = await res.json();
        setProperties(data); // เอาข้อมูลใส่ตัวแปร
        setLoading(false);   // บอกว่าโหลดเสร็จแล้ว
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="text-center p-10 text-xl">กำลังโหลดข้อมูลบ้าน... ⏳</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">🏡 บ้านเชียงใหม่</h1>
          <p className="text-gray-500 text-lg">รวมทรัพย์สวย ราคาดี จาก Estate.co</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {properties.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="h-64 w-full relative bg-gray-200">
                {/* แสดงรูปภาพ (ถ้าไม่มีรูป จะโชว์กรอบสีเทาแทน) */}
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'}} // กันภาพเสีย
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">ไม่มีรูปภาพ</div>
                )}
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">{item.title}</h2>
                <p className="text-gray-500 flex items-center mb-4 text-sm">
                  📍 {item.location}
                </p>
                <div className="flex justify-between items-center border-t pt-4">
                  <span className="text-2xl font-bold text-red-600">
                    ฿{Number(item.price).toLocaleString()}
                  </span>
                  <a href="https://line.me/ti/p/~ไอดีไลน์พี่" target="_blank" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm">
                    สนใจทักแชท
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}