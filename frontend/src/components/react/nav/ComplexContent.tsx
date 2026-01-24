import React from 'react';

const ComplexContent: React.FC = () => (
  <div className="w-80">
    <div className="p-4">
      <h3 className="font-bold text-lg mb-2">Complex Popover</h3>
      <p className="text-sm text-gray-600 mb-4">This is a fully customizable popover with various elements, ideal for mega menus or detailed sub-navigation.</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-2">Services</h4>
          <ul className="space-y-1">
            <li><a href="#" className="text-sm hover:underline">Web Design</a></li>
            <li><a href="#" className="text-sm hover:underline">SEO</a></li>
            <li><a href="#" className="text-sm hover:underline">Marketing</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Resources</h4>
          <ul className="space-y-1">
            <li><a href="#" className="text-sm hover:underline">Blog</a></li>
            <li><a href="#" className="text-sm hover:underline">Case Studies</a></li>
            <li><a href="#" className="text-sm hover:underline">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-4 flex space-x-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm">Learn More</button>
        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded text-sm">Get Started</button>
      </div>
    </div>
  </div>
);

export default ComplexContent;