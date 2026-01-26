import React from 'react';

const ComplexContent: React.FC = () => (
  <div className="w-80">
    <div className="p-4">
      <h3 className="font-bold text-lg mb-2 text-headings">Complex Popover</h3>
      <p className="text-sm text-text mb-4">This is a fully customizable popover with various elements, ideal for mega menus or detailed sub-navigation.</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-2 text-headings">Services</h4>
          <ul className="space-y-1">
            <li><a href="#" className="text-sm text-text hover:text-primary-500 transition-colors">Web Design</a></li>
            <li><a href="#" className="text-sm text-text hover:text-primary-500 transition-colors">SEO</a></li>
            <li><a href="#" className="text-sm text-text hover:text-primary-500 transition-colors">Marketing</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-headings">Resources</h4>
          <ul className="space-y-1">
            <li><a href="#" className="text-sm text-text hover:text-primary-500 transition-colors">Blog</a></li>
            <li><a href="#" className="text-sm text-text hover:text-primary-500 transition-colors">Case Studies</a></li>
            <li><a href="#" className="text-sm text-text hover:text-primary-500 transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-4 flex space-x-2">
        <button className="bg-primary-500 text-white px-4 py-2 rounded text-sm hover:bg-primary-700 transition-colors">Learn More</button>
        <button className="bg-gray-100 text-gray-900 px-4 py-2 rounded text-sm hover:bg-gray-200 transition-colors">Get Started</button>
      </div>
    </div>
  </div>
);

export default ComplexContent;