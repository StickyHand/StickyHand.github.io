# Function to properly decrypt using the known encryption method
def decrypt_text_properly(encrypted_text, char_list):
    decrypted_text = ""
    N = len(char_list)

    # Create lookup dictionaries
    char_to_index = {char: i for i, char in enumerate(char_list)}
    index_to_char = {i: char for i, char in enumerate(char_list)}

    for char in encrypted_text:
        if char in char_to_index:
            # Reverse the encryption: y = (2x) mod N -> solve for x
            original_index = (char_to_index[char] * pow(2, -1, N)) % N  # Modular inverse of 2 mod N
            decrypted_text += index_to_char[int(original_index)]
        else:
            decrypted_text += char  # Keep unknown characters as is

    return decrypted_text

# Decrypt the given text properly
decrypted_text_proper = decrypt_text_properly("(jxxD “pbN<2a", char_list)
decrypted_text_proper
