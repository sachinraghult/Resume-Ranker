file_list=("weights/download.py" "unittests.py" "test.py")

for py_file in "${file_list[@]}"
do
    echo "Running $py_file ..."
    python ${py_file}
done