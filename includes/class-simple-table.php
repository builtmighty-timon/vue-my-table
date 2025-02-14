<?php

class Simple_Table_Filter {

    private $_org_id = null;

    public function get_test_data() : array {

        $org_id = intval( isset($_GET['org_id'])) ? $_GET['org_id'] : null;

        if ( ! $org_id ) { 
            return [];
        }

        if ( ! user_can( wp_get_current_user(), 'manage_options' )) {
            return [];
        }

        $this->_org_id = $org_id;

	    // Sample data from PHP array (replace with DB query results as needed).
        $raw_test_data = apply_filters('simple_table_filter_data', [], $org_id );

        if ( !$raw_test_data ) {
            return [];
        }

        $data =  array_map(function(object $item) {

            $arr_item = (array) $item;

            $props = ['expires_at', 'redeemed_at'];

            foreach( $props as $property ) {
                if ( isset($arr_item[$property]) ) {
                    $arr_item[$property] = $arr_item[$property]->format('m/d/Y');
                }
            }

			return $arr_item;

        }, $raw_test_data);

		return $data;
    }

    public function init() {
        // Enqueue scripts and styles.
        add_action('wp_enqueue_scripts', [$this, 'enqueue_scripts']);

        // Register shortcode for table display.
        add_shortcode('vue_my_table', [$this, 'render_table']);

        add_action('woocommerce_account_dashboard', [ $this, 'add_vue_my_table_to_dashboard' ]);
    }

    public function enqueue_scripts()
    {
        // Enqueue your custom app.js script.
        wp_enqueue_script('simple-table-app', STF_URL . 'assets/js/app.js', null, true);

        // Localize PHP data to JavaScript (optional if data needs to pass from PHP).
        wp_localize_script('simple-table-app', 'simpleTableData', array(
            'tableData' => $this->get_test_data(), // Pass your table data from PHP as JSON.
        ));

        wp_enqueue_style('vue-my-table', STF_URL . 'assets/css/styles.css', [], null, 'all');
    }

    public function render_table() : string {
        // Pass data to the template.
        ob_start();
        require STF_PATH . 'templates/front-table.php';
        return ob_get_clean();
    }

    function add_vue_my_table_to_dashboard() {
        echo do_shortcode('[vue_my_table]');
    }
}
