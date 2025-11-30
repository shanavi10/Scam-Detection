<?php
// Database connection settings
$host = 'localhost';  // Database host (use 'localhost' if running locally)
$dbname = 'fraud_cases_analysis';  // Name of the database
$username = 'root';  // MySQL username
$password = '';  // MySQL password (leave empty if no password)

// Create a PDO connection
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    // Set PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get the selected city and time period from the query string (default to 'New York' and 'week')
    $city = isset($_GET['city']) ? $_GET['city'] : 'New York';
    $time_period = isset($_GET['time_period']) ? $_GET['time_period'] : 'week';

    // SQL query to fetch fraud cases data based on selected city and time period
    $sql = "SELECT day, total_fraud_cases FROM fraud_cases WHERE city = :city AND time_period = :time_period ORDER BY FIELD(day, ";
    
    // If the time period is 'week', we'll use the days of the week in a specific order
    if ($time_period === 'week') {
        $sql .= "'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday')";
    } elseif ($time_period === 'month') {
        // If the time period is 'month', order by the months
        $sql .= "'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December')";
    } else {
        // If the time period is 'year', order by years
        $sql .= "'2023', '2022')";
    }

    // Prepare and execute the query
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':city', $city);
    $stmt->bindParam(':time_period', $time_period);
    $stmt->execute();

    // Fetch data as an associative array
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return the data as JSON
    if ($data) {
        echo json_encode($data);
    } else {
        echo json_encode([]);
    }

} catch (PDOException $e) {
    // In case of an error, return an error message as JSON
    echo json_encode(['error' => $e->getMessage()]);
}
?>
