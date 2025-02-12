<?php

class Simple_Table_Filter {

	// DELETE ME DELETE ME DELETE MEEEE!!!!
	const TEST_ORG_ID = 100;

    public function get_test_data( int $org_id ) : array|null {

	    // Sample data from PHP array (replace with DB query results as needed).
        $raw_test_data = apply_filters('simple_table_filter_data', [], $org_id );

        if ( !$raw_test_data ) {
            return null;
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
        add_shortcode('simple_table_filter', [$this, 'render_table']);
    }

    public function enqueue_scripts()
    {

        // Enqueue your custom app.js script.
        wp_enqueue_script('simple-table-app', STF_URL . 'assets/js/app.js', null, true);

        // Localize PHP data to JavaScript (optional if data needs to pass from PHP).
        wp_localize_script('simple-table-app', 'simpleTableData', array(
            'tableData' => $this->get_test_data( self::TEST_ORG_ID ), // Pass your table data from PHP as JSON.
        ));

        wp_enqueue_style('vue-my-table', STF_URL . 'assets/css/styles.css', [], null, 'all');
    }

    public function render_table() : string {
        // Pass data to the template.
        ob_start();
        require STF_PATH . 'templates/front-table.php';
        return ob_get_clean();
    }

}
