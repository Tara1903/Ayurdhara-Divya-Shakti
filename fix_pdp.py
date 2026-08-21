import sys
with open('src/components/PDPClient.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

t1 = "const isIndividualPack = product.name === 'Trial Wellness Pack' || product.name === 'Diamond Trial Wellness Pack';"
r1 = "const isIndividualPack = product.name === 'Trial Wellness Pack' || product.name === 'Diamond Trial Wellness Pack' || product.name === 'Gold Wellness Pack' || product.name === 'Premium Wellness Pack';"
c = c.replace(t1, r1)

t2 = "const isGoldPack = product.name === 'Gold Wellness Pack' || product.name === 'Premium Wellness Pack';"
r2 = "const isGoldPack = false;"
c = c.replace(t2, r2)

t3 = "{isGoldPack ? 'Choose Your 4 Wellness Categories' : 'Choose Your Wellness Category'}"
r3 = "{'Choose Your Wellness Category'}"
c = c.replace(t3, r3)

t4 = '''let selectionsStr = '';
        if (isMassage || isIndividualPack) {
          selectionsStr = categorySelections[0];
        } else if (isGoldPack) {
          selectionsStr = categorySelections.slice(0, 4).join(', ');
        } else if (isFamilyPack) {
          selectionsStr = categorySelections.slice(0, numMembers).join(', ');
        }'''
        
r4 = '''let selectionsStr = '';
        if (isFamilyPack) {
          selectionsStr = categorySelections.slice(0, numMembers).join(', ');
        } else if (isIndividualPack || isMassage) {
          selectionsStr = categorySelections[0];
        }'''
c = c.replace(t4, r4)

with open('src/components/PDPClient.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
print('Done')
