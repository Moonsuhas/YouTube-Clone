//   ComingSoon Component
//   ----------------------------------------------------------
//   A simple placeholder page to indicate that a feature or section 
//   is not yet implemented.
//  
//   Props:
//    - title (string): The title of the page/section that is coming soon
//  
//   Usage:
//    <ComingSoon title="Shorts" />
//    <ComingSoon title="Subscriptions" />
//   
//   Design:
//    - Centers the message both vertically and horizontally
//   - Uses Tailwind CSS for styling
//  
const ComingSoon = ({ title }) => {
  return (
    <div className="flex items-center justify-center h-[70vh]">
      <h1 className="text-2xl font-semibold text-gray-500">
        {title} – Coming Soon 🚧
      </h1>
    </div>
  );
};

export default ComingSoon;
