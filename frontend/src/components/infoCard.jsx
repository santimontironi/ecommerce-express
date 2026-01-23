const InfoCard = ({ icon, title, description }) => {
    return (
        <div className="p-8 sm:p-10 bg-linear-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-3xl shadow-xl hover:shadow-2xl hover:border-gray-600 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-linear-to-br from-gray-700 to-gray-800 border-2 border-gray-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <i className={`bi bi-${icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">{title}</h3>
            </div>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                {description}
            </p>
        </div>
    );
};

export default InfoCard;