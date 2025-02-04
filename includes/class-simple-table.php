<?php

class Simple_Table_Filter {

    public function get_test_data( int $org_id = null ) {
        $data = apply_filters('simple_table_filter_data', [], $org_id );
        return $data;
    }

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
            'tableData' => $this->get_test_data(), // Pass your table data from PHP as JSON.
        ));

        wp_enqueue_style('vue-my-table', STF_URL . 'assets/css/styles.css', [], null, 'all');
    }

    public function render_table() {
        // Sample data from PHP array (replace with DB query results as needed).
        $raw_test_data = $this->get_test_data();
        $test_data = array_map(function(object $item) {

            $arr_item = (array) $item;

            $props = ['expiration_date'];

            foreach( $props as $property ) {
                if ( isset($arr_item[$property]) ) {
                    $arr_item[$property] = $arr_item[$property]->format('Y-m-d H:i:s');
                }
            }

            return $arr_item;
        }, $raw_test_data);

        // Pass data to the template.
        ob_start();
        require STF_PATH . 'templates/front-table.php';
        return ob_get_clean();
    }
}
