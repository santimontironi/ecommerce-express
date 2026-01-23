const FeatureCard = ({ icon, title, description }) => {
    return (
        <div className="p-8 bg-linear-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-lg hover:shadow-xl hover:border-gray-600 transition-all duration-300 hover:-translate-y-1 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-linear-to-br from-gray-700 to-gray-800 border-2 border-gray-600 rounded-2xl flex items-center justify-center shadow-lg">
                <i className={`bi bi-${icon} text-3xl text-gray-300`}></i>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-gray-400">{description}</p>
        </div>
    );
};

export default FeatureCard;