exports.getDashboardData = async (req, res) => {
    try {
        let filteredData;
        if (req.user.role === "super_admin") {
            filteredData = await getAllData(); // Fetch all data for super admin
        } else if (req.user.role === "brand_user") {
            filteredData = await shoe.find({ brand: req.user.brand }); // Filter data by brand for brand users
        } else {
            return res.status(403).json({ message: "Access denied" }); // Handle unauthorized access
        }

        res.status(200).json(filteredData);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching dashboard data" });
    }
    };