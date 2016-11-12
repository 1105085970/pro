<?php

use Illuminate\Database\Seeder;

class CommtypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [];
        for($k=1;$k<40;$k++){
            $temp = [];
            $temp['commid'] = $k;
            $temp['name'] = str_random(6);
            $temp['addtime'] = time();
            $data[] = $temp;
        }
         DB::table('commtypes')->insert($data);
    }
}
