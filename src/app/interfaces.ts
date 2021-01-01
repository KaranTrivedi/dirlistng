export interface DirectoryFolder
{
    name: string,
    modify_time: string,
    modify_time_h: string,
    file_count: number,
    folder_count: number
}

export interface DirectoryFiles
{
    name: string,
    ext: string
    modify_time: string,
    modify_time_h: string,
    size: number,
    size_h: string,
    path: string
}

export interface Directory
{
    folders: DirectoryFolder[],
    files: DirectoryFiles[],
    path_vars: string[],
    path: string,
    file_size_total: number,
    file_size_total_h: string,
    valid: boolean
}