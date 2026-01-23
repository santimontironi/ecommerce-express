const ContactCard = ({ icon, title, subtitle }) => {
    return (
        <div className="p-6 bg-linear-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/30 rounded-2xl text-center">
            <i className={`bi bi-${icon} text-3xl text-gray-300 mb-2`}></i>
            <p className="text-sm text-gray-400 font-medium">{title}</p>
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        </div>
    );
};

export default ContactCard;
