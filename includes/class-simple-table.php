<?php

class Simple_Table_Filter {

    public $test_data = [
        ['test_code' => 'TC001', 'test' => 'Math', 'language' => 'EN', 'order_num' => 1234, 'taker_name' => 'John Doe', 'taker_email' => 'john@example.com', 'expiration_date' => '2023-12-31', 'used_on_date' => '', 'results' => 'Passed'],
        ['test_code' => 'TC002', 'test' => 'Science', 'language' => 'FR', 'order_num' => 1235, 'taker_name' => 'Jane Smith', 'taker_email' => 'jane@example.com', 'expiration_date' => '2023-11-30', 'used_on_date' => '', 'results' => 'Pending'],
        ['test_code' => 'TC003', 'test' => 'Math', 'language' => 'ES', 'order_num' => 1236, 'taker_name' => 'Alice Johnson', 'taker_email' => 'alice@example.com', 'expiration_date' => '2024-01-15', 'used_on_date' => '2023-10-15', 'results' => 'Passed'],
        ['test_code' => 'TC004', 'test' => 'Science', 'language' => 'EN', 'order_num' => 1237, 'taker_name' => 'Bob Brown', 'taker_email' => 'bob@example.com', 'expiration_date' => '2023-12-15', 'used_on_date' => '', 'results' => 'Pending'],
        ['test_code' => 'TC005', 'test' => 'History', 'language' => 'FR', 'order_num' => 1238, 'taker_name' => 'Claire Green', 'taker_email' => 'claire@example.com', 'expiration_date' => '2023-11-20', 'used_on_date' => '2023-09-25', 'results' => 'Passed'],
        ['test_code' => 'TC006', 'test' => 'Math', 'language' => 'EN', 'order_num' => 1239, 'taker_name' => 'David Hall', 'taker_email' => 'david@example.com', 'expiration_date' => '2024-01-10', 'used_on_date' => '', 'results' => 'Failed'],
        ['test_code' => 'TC007', 'test' => 'Science', 'language' => 'ES', 'order_num' => 1240, 'taker_name' => 'Ella King', 'taker_email' => 'ella@example.com', 'expiration_date' => '2023-12-01', 'used_on_date' => '', 'results' => 'Pending'],
        ['test_code' => 'TC008', 'test' => 'History', 'language' => 'EN', 'order_num' => 1241, 'taker_name' => 'Frank White', 'taker_email' => 'frank@example.com', 'expiration_date' => '2024-02-01', 'used_on_date' => '', 'results' => 'Pending'],
        ['test_code' => 'TC009', 'test' => 'Science', 'language' => 'FR', 'order_num' => 1242, 'taker_name' => 'Grace Adams', 'taker_email' => 'grace@example.com', 'expiration_date' => '2024-01-01', 'used_on_date' => '', 'results' => 'Pending'],
        ['test_code' => 'TC010', 'test' => 'Math', 'language' => 'FR', 'order_num' => 1243, 'taker_name' => 'Harry Clark', 'taker_email' => 'harry@example.com', 'expiration_date' => '2023-12-25', 'used_on_date' => '2023-11-10', 'results' => 'Passed'],
        ['test_code' => 'TC011', 'test' => 'History', 'language' => 'ES', 'order_num' => 1244, 'taker_name' => 'Isabella Lewis', 'taker_email' => 'isabella@example.com', 'expiration_date' => '2024-01-10', 'used_on_date' => '', 'results' => 'Failed'],
        ['test_code' => 'TC012', 'test' => 'Science', 'language' => 'EN', 'order_num' => 1245, 'taker_name' => 'Jack Walker', 'taker_email' => 'jack@example.com', 'expiration_date' => '2023-11-30', 'used_on_date' => '2023-10-01', 'results' => 'Passed'],
        ['test_code' => 'TC013', 'test' => 'Math', 'language' => 'EN', 'order_num' => 1246, 'taker_name' => 'Kelly Evans', 'taker_email' => 'kelly@example.com', 'expiration_date' => '2024-02-15', 'used_on_date' => '', 'results' => 'Pending'],
        ['test_code' => 'TC014', 'test' => 'Science', 'language' => 'ES', 'order_num' => 1247, 'taker_name' => 'Liam Scott', 'taker_email' => 'liam@example.com', 'expiration_date' => '2024-01-20', 'used_on_date' => '', 'results' => 'Pending'],
        ['test_code' => 'TC015', 'test' => 'History', 'language' => 'FR', 'order_num' => 1248, 'taker_name' => 'Mia Young', 'taker_email' => 'mia@example.com', 'expiration_date' => '2023-12-10', 'used_on_date' => '2023-10-20', 'results' => 'Passed'],
        ['test_code' => 'TC016', 'test' => 'Math', 'language' => 'EN', 'order_num' => 1249, 'taker_name' => 'Noah Miller', 'taker_email' => 'noah@example.com', 'expiration_date' => '2023-11-15', 'used_on_date' => '2023-10-05', 'results' => 'Passed'],
        ['test_code' => 'TC017', 'test' => 'Science', 'language' => 'FR', 'order_num' => 1250, 'taker_name' => 'Olivia Wilson', 'taker_email' => 'olivia@example.com', 'expiration_date' => '2023-12-05', 'used_on_date' => '2023-11-01', 'results' => 'Passed'],
        ['test_code' => 'TC018', 'test' => 'History', 'language' => 'ES', 'order_num' => 1251, 'taker_name' => 'Paul Anderson', 'taker_email' => 'paul@example.com', 'expiration_date' => '2024-02-20', 'used_on_date' => '', 'results' => 'Pending'],
        ['test_code' => 'TC019', 'test' => 'Math', 'language' => 'FR', 'order_num' => 1252, 'taker_name' => 'Quinn Martinez', 'taker_email' => 'quinn@example.com', 'expiration_date' => '2023-12-20', 'used_on_date' => '2023-11-15', 'results' => 'Passed'],
        ['test_code' => 'TC020', 'test' => 'Science', 'language' => 'EN', 'order_num' => 1253, 'taker_name' => 'Rachel Lee', 'taker_email' => 'rachel@example.com', 'expiration_date' => '2024-01-25', 'used_on_date' => '', 'results' => 'Pending'],
    ];

    public function init() {
        // Enqueue scripts and styles.
        add_action('wp_enqueue_scripts', [$this, 'enqueue_scripts']);

        // Register shortcode for table display.
        add_shortcode('simple_table_filter', [$this, 'render_table']);
    }

    public function enqueue_scripts()
    {
        // Enqueue Vue.js from a CDN (or local if preferred).
        wp_enqueue_script('vue', 'https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.min.js', [], null, true);

        // Enqueue your custom app.js script.
        wp_enqueue_script('simple-table-app', STF_URL . 'assets/js/app.js', ['vue'], null, true);

        // Localize PHP data to JavaScript (optional if data needs to pass from PHP).
        wp_localize_script('simple-table-app', 'simpleTableData', array(
            'tableData' => $this->test_data, // Pass your table data from PHP as JSON.
        ));

        wp_enqueue_style('vue-my-table', STF_URL . 'assets/css/styles.css', [], null, 'all');
    }


    public function render_table() {
        // Sample data from PHP array (replace with DB query results as needed).
        $test_data = $this->test_data;

        // Pass data to the template.
        ob_start();
        require STF_PATH . 'templates/front-table.php';
        return ob_get_clean();
    }
}
