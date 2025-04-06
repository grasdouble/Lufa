#!/bin/bash

# This script is designed to create a CDN structure for the specified packages.
# It will create a directory structure for each package and download the specified versions.
# The script uses npm to fetch the package versions and jq to parse JSON data.
# It is assumed that the script is run in an environment where npm and jq are installed.
# The script requires the following environment variables to be set:
# - GITHUB_TOKEN: A GitHub token with access to the packages.
# - CDN_ROOT_FOLDER: The root folder where the CDN structure will be created.
# - GITHUB_ORG: The GitHub organization name where the packages are hosted.



# List of packages to be processed
packages=(
    "lufa_design-system"
    "lufa_microfrontend_home"
    # Add more packages here if needed
)

# Token for GitHub authentication
GITHUB_TOKEN="TBD"
# Path to the CDN root folder
# This should be the path where you want to store the packages
CDN_ROOT_FOLDER="TBD"
# GitHub organization name
# This should be the name of your GitHub organization
# where the packages are hosted
GITHUB_ORG="TBD"

# Add path for nodejs for o2switch
PATH=/opt/alt/alt-nodejs22/root/bin:$PATH


# Create the CDN structure
create_cdn_structure() {
    mkdir -p "$CDN_ROOT_FOLDER"

    for package in "${packages[@]}"; do
        echo "Creation of the tree structure for the package : $package"
        package_dir="$CDN_ROOT_FOLDER/$GITHUB_ORG/$package"
        mkdir -p "$package_dir"

        versions=$(npm view "@grasdouble/$package" versions --json)
        echo "Available versions : $versions"

        for version in $(echo "$versions" | jq -r '.[]'); do
            echo "Addition of $version version to CDN"
            mkdir -p "$package_dir/$version"

            if [ ! -f "grasdouble-$package-$version.tgz" ]; then
                npm pack @grasdouble/$package@$version
                tar -xzf "grasdouble-$package-$version.tgz" -C "$package_dir/$version" --strip-components=1
            else
                echo "Package grasdouble-$package-$version.tgz already exists, skipping npm pack."
            fi
        done
    done
}

create_cdn_structure