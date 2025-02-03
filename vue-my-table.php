<?php
/*
Plugin Name: Vue My Table!
Description: A WordPress plugin to render a sortable and filterable table for data review.
Version: 0.0.1
Author: Built Mighty - Timon Davis et al
*/

defined('ABSPATH') || exit;

// Define plugin constants.
define('STF_URL', plugin_dir_url(__FILE__));
define('STF_PATH', plugin_dir_path(__FILE__));

// Include the plugin class.
require_once STF_PATH . 'includes/class-simple-table.php';

// Initialize the plugin.
function simple_table_filter_init() {
    $simple_table = new Simple_Table_Filter();
    $simple_table->init();
}
add_action('plugins_loaded', 'simple_table_filter_init');