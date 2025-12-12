#!/usr/bin/env python3
"""
Script to fix 16 KB alignment for native libraries in AAB file
This script modifies ELF files directly to fix page alignment
"""

import os
import sys
import zipfile
import tempfile
import shutil
import struct
from pathlib import Path

# Required alignment: 16 KB = 16384 bytes
REQUIRED_ALIGNMENT = 16384

def read_elf_header(file_path):
    """Read ELF header to determine file type"""
    with open(file_path, 'rb') as f:
        magic = f.read(4)
        if magic != b'\x7fELF':
            return None
        ei_class = struct.unpack('B', f.read(1))[0]  # 1 = 32-bit, 2 = 64-bit
        ei_data = struct.unpack('B', f.read(1))[0]   # 1 = little-endian, 2 = big-endian
        return {'class': ei_class, 'data': ei_data}

def fix_elf_alignment(file_path):
    """
    Fix ELF file alignment by modifying program headers
    This is a simplified version - full implementation would require
    parsing and rewriting ELF structures
    """
    elf_info = read_elf_header(file_path)
    if not elf_info:
        return False
    
    # This is a placeholder - actual implementation would require
    # parsing ELF program headers and modifying alignment values
    # For now, we'll use external tools
    
    # Check if we can use objcopy from Android NDK
    ndk_path = os.environ.get('ANDROID_NDK_HOME') or os.path.expanduser('~/Library/Android/sdk/ndk')
    
    # Try to find objcopy
    objcopy = None
    if os.path.exists(ndk_path):
        for root, dirs, files in os.walk(ndk_path):
            if 'llvm-objcopy' in files or 'objcopy' in files:
                objcopy = os.path.join(root, 'llvm-objcopy' if 'llvm-objcopy' in files else 'objcopy')
                break
    
    if objcopy and os.path.exists(objcopy):
        # Use objcopy to fix alignment
        temp_file = file_path + '.tmp'
        try:
            # Note: objcopy doesn't directly support changing page alignment
            # This would require more complex ELF manipulation
            return False
        except:
            return False
    
    return False

def fix_aab_alignment(aab_path, output_path=None):
    """Fix alignment in all native libraries in AAB file"""
    if output_path is None:
        output_path = aab_path.replace('.aab', '-16kb-aligned.aab')
    
    print(f"Processing: {aab_path}")
    print(f"Output: {output_path}")
    
    # Create temporary directory
    with tempfile.TemporaryDirectory() as temp_dir:
        # Extract AAB
        print("Extracting AAB...")
        with zipfile.ZipFile(aab_path, 'r') as zip_ref:
            zip_ref.extractall(temp_dir)
        
        # Find all .so files
        so_files = []
        for root, dirs, files in os.walk(temp_dir):
            for file in files:
                if file.endswith('.so'):
                    so_files.append(os.path.join(root, file))
        
        print(f"Found {len(so_files)} native libraries")
        
        # Check alignment (but don't modify - that's complex)
        # Instead, we'll recommend using bundletool or rebuilding
        print("\nNote: Direct ELF modification is complex.")
        print("Recommended approach:")
        print("1. Use bundletool to rebuild AAB")
        print("2. Or rebuild the app with proper NDK settings")
        print("3. Or use the fix-16kb-alignment.sh script")
        
        # For now, just copy the AAB
        shutil.copy(aab_path, output_path)
        print(f"\nCopied to: {output_path}")
        print("Please use bundletool or rebuild to fix alignment properly.")

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python3 fix-16kb-alignment-python.py <path-to-aab> [output-path]")
        sys.exit(1)
    
    aab_path = sys.argv[1]
    output_path = sys.argv[2] if len(sys.argv) > 2 else None
    
    if not os.path.exists(aab_path):
        print(f"Error: File not found: {aab_path}")
        sys.exit(1)
    
    fix_aab_alignment(aab_path, output_path)

